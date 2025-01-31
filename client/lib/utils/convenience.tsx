export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function isValidURL(url: string) {
  const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
  return urlPattern.test(url);
}
export function isNumeric(value: string) {
  const numberPattern = /^\d+$/;
  return numberPattern.test(value);
}
