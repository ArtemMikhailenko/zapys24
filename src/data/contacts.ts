// Single source of truth for every contact link on the site.
export const PHONE_DISPLAY = "+38 (075) 634-60-69";
export const PHONE_RAW = "+380756346069";
export const EMAIL = "zapys.crm@gmail.com";
export const TELEGRAM_HANDLE = "@zapys24";

export const CONTACTS = {
  instagram: "https://www.instagram.com/zapys.crm",
  telegram: "https://t.me/zapys24",
  facebook: "https://www.facebook.com/profile.php?id=61588030602801",
  viber: `viber://chat?number=${encodeURIComponent(PHONE_RAW)}`,
  phone: `tel:${PHONE_RAW}`,
  email: `mailto:${EMAIL}`,
};
