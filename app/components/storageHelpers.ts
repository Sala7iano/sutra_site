// LocalStorage utilities

export function getFavorites() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

export function toggleFavorite(itemName: string) {
  if (typeof window === "undefined") return;
  const favs = getFavorites();
  const exists = favs.includes(itemName);
  const updated = exists
    ? favs.filter((n: string) => n !== itemName)
    : [...favs, itemName];
  localStorage.setItem("favorites", JSON.stringify(updated));
  return updated;
}

export function getCart() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function addToCart(product: any) {
  if (typeof window === "undefined") return;
  const cart = getCart();
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

export function removeFromCart(name: string) {
  if (typeof window === "undefined") return;
  const cart = getCart().filter((p: any) => p.name !== name);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}