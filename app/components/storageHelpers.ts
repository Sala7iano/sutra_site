// app/components/storageHelpers.ts
export type CartItem = { name: string; price: string; img?: string };

function read<T = any>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}
function write(key: string, value: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}
function emit(name: string) {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(name));
}

/* Favorites */
export function getFavorites(): string[] {
  return read<string[]>("favorites", []);
}
export function toggleFavorite(itemName: string): string[] {
  const favs = getFavorites();
  const exists = favs.includes(itemName);
  const updated = exists ? favs.filter((n) => n !== itemName) : [...favs, itemName];
  write("favorites", updated);
  emit("favorites-updated");
  return updated;
}

/* Cart */
export function getCart(): CartItem[] {
  return read<CartItem[]>("cart", []);
}
export function addToCart(product: CartItem): CartItem[] {
  const cart = getCart();
  const updated = [...cart, product];
  write("cart", updated);
  emit("cart-updated");
  return updated;
}
export function removeFromCart(name: string): CartItem[] {
  const updated = getCart().filter((p) => p.name !== name);
  write("cart", updated);
  emit("cart-updated");
  return updated;
}
export function clearCart(): void {
  write("cart", []);
  emit("cart-updated");
}