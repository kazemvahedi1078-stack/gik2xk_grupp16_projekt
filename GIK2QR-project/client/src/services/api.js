// api.js – Centraliserad modul för alla API-anrop mot backend.
// Alla fetch-anrop samlas här för att undvika duplicerad kod i komponenterna.

const API_URL = "http://localhost:5000";

// Hämtar alla produkter med reviews och snittbetyg.
export async function getProducts() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Kunde inte hämta produkter");
  return res.json();
}

// Hämtar en enskild produkt med reviews och snittbetyg.
export async function getProduct(id) {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error("Kunde inte hämta produkt");
  return res.json();
}

// Skapar en ny produkt (admin-funktionalitet).
export async function createProduct({ name, description, price, imageUrl }) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price, imageUrl })
  });
  if (!res.ok) throw new Error("Kunde inte skapa produkt");
  return res.json();
}

// Uppdaterar en befintlig produkt (admin-funktionalitet).
export async function updateProduct(id, { name, description, price, imageUrl }) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price, imageUrl })
  });
  if (!res.ok) throw new Error("Kunde inte uppdatera produkt");
  return res.json();
}

// Tar bort en produkt (admin-funktionalitet).
export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Kunde inte ta bort produkt");
  return res.json();
}

// Lägger till en produkt i varukorgen med angivet antal.
export async function addToCart(productId, amount = 1) {
  const res = await fetch(`${API_URL}/cart/addProduct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      productId,
      amount
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Kunde inte lägga till i varukorgen");
  }

  return res.json();
}

// Hämtar varukorgen för en given användare.
export async function getCart(userId) {
  const res = await fetch(`${API_URL}/cart/${userId}`);
  if (!res.ok) throw new Error("Kunde inte hämta varukorgen");
  return res.json();
}

// Uppdaterar antal av en produkt i varukorgen.
export async function updateCartQuantity(productId, quantity) {
  const res = await fetch(`${API_URL}/cart/updateQuantity`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      productId,
      quantity
    })
  });
  if (!res.ok) throw new Error("Kunde inte uppdatera antal");
  return res.json();
}

// Tar bort en produkt från varukorgen.
export async function removeFromCart(productId) {
  const res = await fetch(`${API_URL}/cart/removeProduct`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      productId
    })
  });
  if (!res.ok) throw new Error("Kunde inte ta bort produkt");
  return res.json();
}

// Skapar en ny recension/betyg för en produkt.
export async function createReview({ rating, comment, productId }) {
  const res = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rating,
      comment,
      productId,
      userId: 1
    })
  });
  if (!res.ok) throw new Error("Kunde inte skapa recension");
  return res.json();
}
