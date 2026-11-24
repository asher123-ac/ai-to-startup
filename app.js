(function () {
  "use strict";

  const searchBox = document.getElementById("search-box");
  const foodFilter = document.getElementById("food-filter");
  const locationFilter = document.getElementById("location-filter");
  const grid = document.getElementById("listing-grid");
  const emptyMessage = document.getElementById("empty-message");
  const resultsCount = document.getElementById("results-count");
  const toast = document.getElementById("claim-toast");
  const claimedIds = new Set();
  const deadlines = new Map();
  let toastTimer;

  LISTINGS.forEach(function (item) {
    deadlines.set(item.id, Date.now() + item.expiresInMinutes * 60 * 1000);
  });

  document.title = STARTUP.name + " — " + STARTUP.tagline;

  const currency = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });
  const wholeCurrency = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0
  });
  const wholeNumber = new Intl.NumberFormat("en-CA");
  const oneDecimal = new Intl.NumberFormat("en-CA", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function addFilterOptions(select, values) {
    Array.from(new Set(values)).sort().forEach(function (value) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  addFilterOptions(foodFilter, LISTINGS.map(function (item) { return item.category; }));
  addFilterOptions(locationFilter, LISTINGS.map(function (item) { return item.location; }));

  function getExpiry(item) {
    const milliseconds = deadlines.get(item.id) - Date.now();
    const minutes = Math.max(0, Math.ceil(milliseconds / 60000));
    const pickupTime = new Date(deadlines.get(item.id)).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    });

    return {
      expired: milliseconds <= 0,
      text: milliseconds <= 0
        ? "Pickup window ended"
        : "Pickup by " + pickupTime + " · " + minutes + " min left"
    };
  }

  function makeCard(item) {
    const card = makeElement("article", "deal-card");
    const imageWrap = makeElement("div", "deal-image-wrap");
    const image = document.createElement("img");
    image.className = "deal-image";
    image.src = item.image;
    image.alt = item.imageAlt;
    image.loading = "lazy";
    image.addEventListener("error", function () {
      imageWrap.classList.add("image-failed");
      image.remove();
      imageWrap.appendChild(makeElement("span", "image-fallback", "🥡"));
    }, { once: true });

    const discount = Math.round((1 - item.dealPrice / item.originalPrice) * 100);
    const discountBadge = makeElement("span", "discount-badge", discount + "% OFF");
    const portionsBadge = makeElement("span", "portions-badge", item.portionsLeft + " left");
    imageWrap.append(image, discountBadge, portionsBadge);

    const content = makeElement("div", "deal-content");
    const vendorLine = makeElement("div", "vendor-line");
    const vendorIcon = makeElement("span", "vendor-icon", item.vendor.charAt(0));
    vendorIcon.setAttribute("aria-hidden", "true");
    const vendorInfo = makeElement("span", "vendor-info");
    vendorInfo.append(
      makeElement("strong", "", item.vendor),
      makeElement("span", "", item.location)
    );
    vendorLine.append(vendorIcon, vendorInfo);

    const title = makeElement("h3", "deal-title", item.name);
    const description = makeElement("p", "deal-description", item.description);
    const details = makeElement("div", "deal-details");
    const category = makeElement("span", "category-pill", item.category);
    const expiry = getExpiry(item);
    const expiryLabel = makeElement("span", "expiry-label" + (expiry.expired ? " is-expired" : ""), expiry.text);
    expiryLabel.dataset.expiryId = item.id;
    details.append(category, expiryLabel);

    const buyRow = makeElement("div", "deal-buy-row");
    const price = makeElement("div", "deal-price");
    price.append(
      makeElement("strong", "", currency.format(item.dealPrice)),
      makeElement("s", "", currency.format(item.originalPrice))
    );
    const isClaimed = claimedIds.has(item.id);
    const claimButton = makeElement(
      "button",
      "claim-button" + (isClaimed ? " is-claimed" : ""),
      isClaimed ? "Claimed ✓" : "Claim deal"
    );
    claimButton.type = "button";
    claimButton.setAttribute("aria-label", isClaimed
      ? item.name + " claimed in this demo"
      : "Simulate claiming " + item.name + " for " + currency.format(item.dealPrice));
    claimButton.disabled = isClaimed || expiry.expired;
    if (!isClaimed && !expiry.expired) {
      claimButton.addEventListener("click", function () {
        claimDeal(item);
      });
    } else if (expiry.expired && !isClaimed) {
      claimButton.textContent = "Deal ended";
      claimButton.classList.add("is-ended");
    }

    buyRow.append(price, claimButton);
    content.append(vendorLine, title, description, details, buyRow);
    card.append(imageWrap, content);
    return card;
  }

  function renderListings() {
    const query = searchBox.value.trim().toLowerCase();
    const category = foodFilter.value;
    const location = locationFilter.value;
    const matches = LISTINGS.filter(function (item) {
      const searchable = [
        item.name,
        item.vendor,
        item.category,
        item.location,
        item.description
      ].join(" ").toLowerCase();

      return searchable.includes(query)
        && (!category || item.category === category)
        && (!location || item.location === location);
    });

    grid.replaceChildren.apply(grid, matches.map(makeCard));
    resultsCount.textContent = matches.length + (matches.length === 1 ? " deal" : " deals");
    emptyMessage.hidden = matches.length > 0;
  }

  function updateImpact() {
    const claims = claimedIds.size;
    const savings = LISTINGS.reduce(function (total, item) {
      return total + (claimedIds.has(item.id) ? item.originalPrice - item.dealPrice : 0);
    }, 0);
    const waste = LISTINGS.reduce(function (total, item) {
      return total + (claimedIds.has(item.id) ? item.wasteKg : 0);
    }, 0);

    document.getElementById("metric-claims").textContent =
      wholeNumber.format(COMMUNITY_IMPACT.dealsClaimed + claims);
    document.getElementById("metric-savings").textContent =
      wholeCurrency.format(COMMUNITY_IMPACT.studentSavings + savings);
    document.getElementById("metric-waste").textContent =
      oneDecimal.format(COMMUNITY_IMPACT.foodWasteKg + waste) + " kg";

    document.getElementById("demo-summary").textContent = claims === 0
      ? "Claim a deal to see your demo impact grow."
      : "Your demo: " + claims + (claims === 1 ? " deal claimed · " : " deals claimed · ")
        + currency.format(savings) + " saved · " + oneDecimal.format(waste) + " kg food rescued.";
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 4500);
  }

  function claimDeal(item) {
    if (claimedIds.has(item.id) || Date.now() >= deadlines.get(item.id)) return;

    claimedIds.add(item.id);
    updateImpact();
    renderListings();
    showToast("Demo claim confirmed for " + item.name + ". No real order or reservation was made.");
  }

  function clearFilters() {
    searchBox.value = "";
    foodFilter.value = "";
    locationFilter.value = "";
    renderListings();
  }

  searchBox.addEventListener("input", renderListings);
  foodFilter.addEventListener("change", renderListings);
  locationFilter.addEventListener("change", renderListings);
  document.getElementById("clear-filters").addEventListener("click", clearFilters);
  document.getElementById("empty-clear").addEventListener("click", clearFilters);

  document.getElementById("reset-demo").addEventListener("click", function () {
    claimedIds.clear();
    updateImpact();
    renderListings();
    showToast("Demo claims reset. Community sample numbers are unchanged.");
  });

  updateImpact();
  renderListings();
  window.setInterval(renderListings, 60000);
})();
