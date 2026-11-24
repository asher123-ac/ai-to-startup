// Fictional sample content for the Campus Crave student prototype.
// No real businesses, people, reservations, or payments are represented.

const STARTUP = {
  name: "Campus Crave",
  tagline: "Good food. Better prices.",
  pitch: "Last-minute campus food deals help students save money and local food businesses waste less."
};

const COMMUNITY_IMPACT = {
  dealsClaimed: 1284,
  studentSavings: 8940,
  foodWasteKg: 356.8
};

const LISTINGS = [
  {
    id: "rainbow-bowl",
    name: "Rainbow power bowl",
    vendor: "Sprout & Spoon",
    category: "Bowls & salads",
    location: "Campus Centre",
    description: "Roasted sweet potato, crunchy greens, grains, and lemon tahini.",
    originalPrice: 13.00,
    dealPrice: 7.00,
    portionsLeft: 4,
    expiresInMinutes: 82,
    wasteKg: 0.42,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Fresh grain salad with colorful vegetables"
  },
  {
    id: "focaccia-pair",
    name: "Focaccia for two",
    vendor: "The Crumb Corner",
    category: "Bakery",
    location: "Main Campus",
    description: "Two fluffy rosemary focaccia squares, baked fresh this morning.",
    originalPrice: 9.00,
    dealPrice: 4.50,
    portionsLeft: 3,
    expiresInMinutes: 126,
    wasteKg: 0.3,
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Freshly baked golden bread"
  },
  {
    id: "garden-wrap",
    name: "Garden crunch wrap",
    vendor: "Green Fork Café",
    category: "Sandwiches",
    location: "Mulroney Hall",
    description: "A generous veggie wrap with hummus, greens, and pickled onion.",
    originalPrice: 11.50,
    dealPrice: 6.00,
    portionsLeft: 5,
    expiresInMinutes: 164,
    wasteKg: 0.36,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Fresh sandwich filled with greens and vegetables"
  },
  {
    id: "margherita-box",
    name: "Margherita pizza box",
    vendor: "Hearthstone Pizza",
    category: "Pizza",
    location: "College Street",
    description: "Three cheesy slices with tomato, basil, and a crisp golden crust.",
    originalPrice: 12.00,
    dealPrice: 6.50,
    portionsLeft: 2,
    expiresInMinutes: 198,
    wasteKg: 0.48,
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Fresh pizza with melted cheese and basil"
  },
  {
    id: "miso-rice-bowl",
    name: "Miso-glazed rice bowl",
    vendor: "Bento Buddy",
    category: "Hot meals",
    location: "Campus Centre",
    description: "Warm rice, seasonal vegetables, and a savoury miso glaze.",
    originalPrice: 14.00,
    dealPrice: 8.00,
    portionsLeft: 3,
    expiresInMinutes: 232,
    wasteKg: 0.5,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Japanese-style rice bowl topped with vegetables"
  },
  {
    id: "veggie-curry",
    name: "Cozy veggie curry",
    vendor: "Saffron Spoon",
    category: "Hot meals",
    location: "Main Campus",
    description: "A comforting coconut curry with rice and seasonal vegetables.",
    originalPrice: 13.50,
    dealPrice: 7.50,
    portionsLeft: 4,
    expiresInMinutes: 276,
    wasteKg: 0.52,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Bowl of colorful curry served with rice"
  },
  {
    id: "berry-oats",
    name: "Berry breakfast duo",
    vendor: "Morning Common",
    category: "Breakfast",
    location: "Mulroney Hall",
    description: "Two jars of overnight oats topped with berries and maple.",
    originalPrice: 10.00,
    dealPrice: 5.00,
    portionsLeft: 3,
    expiresInMinutes: 318,
    wasteKg: 0.32,
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Breakfast bowl topped with fresh berries"
  },
  {
    id: "sushi-set",
    name: "Rainbow veggie sushi set",
    vendor: "Roll Call Sushi",
    category: "Sushi",
    location: "College Street",
    description: "A fresh 10-piece roll set with avocado, cucumber, and carrot.",
    originalPrice: 15.00,
    dealPrice: 8.50,
    portionsLeft: 2,
    expiresInMinutes: 352,
    wasteKg: 0.4,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Assorted sushi rolls arranged on a plate"
  }
];
