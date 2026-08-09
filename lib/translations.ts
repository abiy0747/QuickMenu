export const languages = ["en", "am"] as const;

export type Language = (typeof languages)[number];

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.favorite": "Favorite",
    "nav.reviews": "Reviews",
    "nav.profile": "Profile",

    // Hero
    "hero.line1": "Scan, Browse,",
    "hero.slogan": "Enjoy.",

    // Search & filters
    "search.placeholder": "Search food...",
    "search.all": "All",
    "search.allPrices": "All Prices",
    "search.under200": "Under 200 ETB",
    "search.price200to500": "200 - 500 ETB",
    "search.above500": "Above 500 ETB",

    // Menu grid
    "menu.popularDishes": "Popular Dishes",
    "menu.oneDishAvailable": "1 dish available",
    "menu.dishesAvailable": "{count} dishes available",
    "menu.noDishes": "No dishes found",
    "menu.noDishesHint":
      "Try another category, price range, or search term.",
    "menu.order": "Call Waiter",
    "menu.orderSent": "Waiter Notified!",
    "menu.orderMessage":
      "A waiter will come to your table to take your order.",
    "menu.orderHint": "Please wait a moment.",
    "menu.name": "Name",
    "menu.description": "Description",
    "menu.ingredients": "Ingredients",
    "menu.ok": "OK",
    "menu.close": "Close",

    // Profile
    "profile.guest": "Guest",
    "profile.welcome": "Welcome to QuickMenu",
    "profile.preferences": "Preferences",
    "profile.darkMode": "Dark Mode",
    "profile.language": "Language",
    "profile.languageEn": "English",
    "profile.languageAm": "አማርኛ",
    "profile.aboutUs": "About Us",

    // Reviews
    "reviews.writeReview": "Write a Review",
    "reviews.hint":
      "Share your experience with this restaurant",
    "reviews.yourRating": "Your Rating",
    "reviews.yourName": "Your name",
    "reviews.placeholder": "Write your review...",
    "reviews.submit": "Submit Review",
    "reviews.success": "Thank you! Your review has been submitted.",
    "reviews.error": "Something went wrong. Please try again.",
    "reviews.selectRating": "Please select a rating",
    "reviews.writeName": "Please enter your name",
    "reviews.writeComment": "Please write your review",
    "reviews.submitting": "Submitting...",
    "reviews.writeAnother": "Write another review",

    // Favorites
    "favorites.title": "Favorites",
    "favorites.empty": "No favorite dishes yet 🍽️",
  },

  am: {
    // Navigation
    "nav.home": "መነሻ",
    "nav.favorite": "ተወዳጅ",
    "nav.reviews": "ግምገማዎች",
    "nav.profile": "መገለጫ",

    // Hero
    "hero.line1": "ይቃኙ፣ ያስሱ፣",
    "hero.slogan": "ይደሰቱ።",

    // Search & filters
    "search.placeholder": "ምግብ ፈልግ...",
    "search.all": "ሁሉም",
    "search.allPrices": "ሁሉም ዋጋዎች",
    "search.under200": "ከ200 ETB በታች",
    "search.price200to500": "ከ200 - 500 ETB",
    "search.above500": "ከ500 ETB በላይ",

    // Menu grid
    "menu.popularDishes": "ተወዳጅ ምግቦች",
    "menu.oneDishAvailable": "1 ምግብ ይገኛል",
    "menu.dishesAvailable": "{count} ምግቦች ይገኛሉ",
    "menu.noDishes": "ምንም ምግብ አልተገኘም",
    "menu.noDishesHint":
      "ሌላ ምድብ፣ የዋጋ ክልል ወይም የፍለጋ ቃል ይሞክሩ።",
    "menu.order": "አስተናጋጅ ይጠሩ",
    "menu.orderSent": "አስተናጋጁ ተጠርቷል!",
    "menu.orderMessage":
      "ትዕዛዝዎን ለመቀበል አስተናጋጁ ወደ ጠረፍዎ ይመጣል።",
    "menu.orderHint": "እባክዎ አፍታ ይጠብቁ።",
    "menu.name": "ስም",
    "menu.description": "መግለጫ",
    "menu.ingredients": "ንጥረ ነገሮች",
    "menu.ok": "እሺ",
    "menu.close": "ዝጋ",

    // Profile
    "profile.guest": "እንግዳ",
    "profile.welcome": "እንኳን ወደ ኩዊክሜኑ በደህና መጡ",
    "profile.preferences": "ምርጫዎች",
    "profile.darkMode": "ጨለማ ሁነታ",
    "profile.language": "ቋንቋ",
    "profile.languageEn": "English",
    "profile.languageAm": "አማርኛ",
    "profile.aboutUs": "ስለ እኛ",

    // Reviews
    "reviews.writeReview": "ግምገማ ይፃፉ",
    "reviews.hint":
      "ስለዚህ ሬስቶራንት ልምድዎን ያካፍሉ",
    "reviews.yourRating": "የእርስዎ ደረጃ",
    "reviews.yourName": "ስምዎ",
    "reviews.placeholder": "ግምገማዎን ይፃፉ...",
    "reviews.submit": "ግምገማ አስገባ",
    "reviews.success": "እናመሰግናለን! ግምገማዎ ተልኳል።",
    "reviews.error": "የሆነ ችግር ተፈጠረ። እባክዎ እንደገና ይሞክሩ።",
    "reviews.selectRating": "እባክዎ ደረጃ ይምረጡ",
    "reviews.writeName": "እባክዎ ስምዎን ያስገቡ",
    "reviews.writeComment": "እባክዎ ግምገማዎን ይፃፉ",
    "reviews.submitting": "በመላክ ላይ...",
    "reviews.writeAnother": "ሌላ ግምገማ ይፃፉ",

    // Favorites
    "favorites.title": "ተወዳጆች",
    "favorites.empty": "ገና የተወዳጅ ምግብ የለም 🍽️",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function translate(
  lang: Language,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  const dictionary = translations[lang];
  const fallback = translations.en;

  let text: string = dictionary[key] ?? fallback[key];

  if (params) {
    for (const [name, value] of Object.entries(params)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }

  return text;
}
