import { type Currency } from "@/store/useCurrencyStore";

export const flags: Record<string, string> = {
  en: "🇺🇸",
  hi: "🇮🇳",
  es: "🇪🇸",
  zh: "🇨🇳",
  ar: "🇦🇪",
  ru: "🇷🇺",
};

export const localeNames: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  es: "Spanish",
  zh: "Chinese",
  ar: "Arabic",
  ru: "Russian",
};

export const currencies: Currency[] = ["USD", "EUR", "INR", "AED", "GBP", "CNY"];
