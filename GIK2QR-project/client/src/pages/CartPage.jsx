// CartPage.jsx – Visar varukorgen med en lista av tillagda produkter.
// Användaren kan öka/minska antal, ta bort produkter och se totalpriset.

import { useEffect, useState } from "react";
import {
  getCart,
  updateCartQuantity,
  removeFromCart
} from "../services/api";

function CartPage({ onCartUpdated }) {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");

  // Hämtar varukorgen från backend och uppdaterar navbarens räknare
  const loadCart = async () => {
    try {
      const data = await getCart(1);
      setCart(data);
      onCartUpdated();
    } catch (err) {
      console.log("Cart error:", err);
      setError("Kunde inte hämta varukorgen");
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Ökar antal av en produkt med 1
  const handleIncrease = async (item) => {
    try {
      await updateCartQuantity(item.productId, item.quantity + 1);
      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  // Minskar antal av en produkt med 1 (minimum 1)
  const handleDecrease = async (item) => {
    try {
      if (item.quantity > 1) {
        await updateCartQuantity(item.productId, item.quantity - 1);
        loadCart();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Tar bort en produkt helt från varukorgen
  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  if (error) {
    return (
      <div className="container mt-4 text-white">
        <h1>Varukorg</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="container mt-4 text-white">
        <h1>Varukorg</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4 text-white">
      <h1 className="mb-4">Varukorg</h1>

      {cart.items.length === 0 ? (
        <p>Din varukorg är tom.</p>
      ) : (
        <>
          <div className="row">
            {cart.items.map((item) => (
              <div key={item.productId} className="col-12 mb-3">
                <div className="card shadow-sm border-0">
                  <div className="card-body text-dark">
                    <h4>{item.name}</h4>
                    <p className="mb-2">Pris: {item.price} kr</p>
                    <p className="mb-2">Antal: {item.quantity}</p>
                    <p className="mb-3">Summa: {item.sum} kr</p>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-dark"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>

                      <button
                        className="btn btn-dark"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemove(item.productId)}
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-4">Totalt: {cart.total} kr</h2>
        </>
      )}
    </div>
  );
}

export default CartPage;
