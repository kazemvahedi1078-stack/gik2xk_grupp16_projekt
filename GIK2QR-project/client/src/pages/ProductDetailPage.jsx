// ProductDetailPage.jsx – Detaljvy för en enskild produkt.
// Visar produktinformation, bild, snittbetyg, lista med recensioner
// och ett formulär för att skicka in ett nytt betyg/recension.

import { useEffect, useState } from "react";
import { getProduct, createReview, addToCart } from "../services/api";

function ProductDetailPage({ productId, goBack, onCartUpdated }) {
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Hämtar produktdata från backend vid laddning och när productId ändras
  const loadProduct = async () => {
    try {
      const data = await getProduct(productId);
      setProduct(data);
    } catch (error) {
      console.log("Error loading product:", error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  // Skickar en ny recension till backend och laddar om produktdata
  const submitReview = async () => {
    try {
      await createReview({ rating: Number(rating), comment, productId });
      setComment("");
      setRating(5);
      loadProduct();
    } catch (error) {
      console.log("Error submitting review:", error);
      alert("Kunde inte skicka recension");
    }
  };

  // Lägger till produkten i varukorgen med valt antal
  const handleAddToCart = async () => {
    try {
      await addToCart(productId, quantity);
      onCartUpdated();
      alert("Produkt tillagd i varukorgen!");
    } catch (error) {
      console.log("Add to cart error:", error);
      alert("Kunde inte lägga till i varukorgen");
    }
  };

  if (!product) {
    return (
      <div className="container mt-4 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4 text-white">
      {/* Tillbaka-knapp för att gå tillbaka till produktlistan */}
      <button className="btn btn-outline-light mb-3" onClick={goBack}>
        <i className="bi bi-arrow-left"></i> Tillbaka
      </button>

      <div className="row">
        {/* Produktbild visas om imageUrl finns */}
        {product.imageUrl && (
          <div className="col-md-5 mb-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
            />
          </div>
        )}

        <div className={product.imageUrl ? "col-md-7" : "col-12"}>
          <h1>{product.name}</h1>
          <p className="lead">{product.description}</p>
          <h3>{product.price} kr</h3>
          <h5>Snittbetyg: {product.avgRating ? product.avgRating.toFixed(1) : "Inga betyg ännu"}</h5>

          {/* Välja antal och lägga i varukorg */}
          <div className="d-flex align-items-center gap-3 mt-3 mb-4">
            <label className="form-label mb-0">Antal:</label>
            <input
              type="number"
              className="form-control"
              style={{ width: "80px" }}
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
            <button className="btn btn-light" onClick={handleAddToCart}>
              <i className="bi bi-cart-plus"></i> Lägg i varukorg
            </button>
          </div>
        </div>
      </div>

      <hr />

      {/* Lista alla recensioner för produkten */}
      <h3>Recensioner ({product.Reviews.length})</h3>

      {product.Reviews.length === 0 ? (
        <p className="text-muted">Inga recensioner ännu.</p>
      ) : (
        product.Reviews.map((review) => (
          <div key={review.id} className="card p-3 mb-2">
            <p className="mb-1">
              {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)} ({review.rating}/5)
            </p>
            <p className="mb-0">{review.comment}</p>
          </div>
        ))
      )}

      <hr />

      {/* Formulär för att skicka in en ny recension */}
      <h3>Skriv en recension</h3>

      <div className="mb-2">
        <label className="form-label">Betyg</label>
        <select
          className="form-select"
          style={{ width: "100px" }}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>5 ★</option>
          <option value={4}>4 ★</option>
          <option value={3}>3 ★</option>
          <option value={2}>2 ★</option>
          <option value={1}>1 ★</option>
        </select>
      </div>

      <div className="mb-2">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Skriv din kommentar..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button className="btn btn-light mb-4" onClick={submitReview}>
        Skicka recension
      </button>
    </div>
  );
}

export default ProductDetailPage;
