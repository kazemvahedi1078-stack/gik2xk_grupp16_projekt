// ProductCard.jsx – Visar en enskild produkt i ett kort.
// Används i ProductsPage för att lista alla produkter.
// Innehåller knappar för att visa detaljer, lägga till i varukorg,
// redigera (admin) och ta bort (admin).

import { addToCart, deleteProduct } from "../services/api";

function ProductCard({ product, openProduct, onCartUpdated, onEditProduct, onProductDeleted }) {
  // Lägger till 1 st av produkten i varukorgen
  const handleAddToCart = async () => {
    try {
      await addToCart(product.id);
      onCartUpdated();
      alert("Produkt tillagd i varukorgen");
    } catch (error) {
      console.log("Add to cart error:", error);
      alert("Kunde inte lägga till i varukorgen");
    }
  };

  // Tar bort produkten efter bekräftelse (admin-funktion)
  const handleDelete = async () => {
    const confirmed = window.confirm(`Vill du verkligen ta bort "${product.name}"?`);
    if (!confirmed) return;

    try {
      await deleteProduct(product.id);
      alert("Produkt borttagen");
      onProductDeleted();
    } catch (error) {
      console.log("Delete product error:", error);
      alert("Kunde inte ta bort produkten");
    }
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border-0 product-card">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="card-img-top"
          />
        )}

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted">{product.description}</p>
          <p className="fw-bold mb-1">{product.price} kr</p>

          {/* Visar snittbetyg om det finns */}
          {product.avgRating > 0 && (
            <p className="text-warning mb-3">
              {"★".repeat(Math.round(product.avgRating))}{"☆".repeat(5 - Math.round(product.avgRating))} ({product.avgRating.toFixed(1)})
            </p>
          )}

          <div className="mt-auto d-grid gap-2">
            <button
              className="btn btn-outline-dark"
              onClick={() => openProduct(product.id)}
            >
              Visa detaljer
            </button>

            <button
              className="btn btn-dark"
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus"></i> Lägg i varukorg
            </button>

            {/* Admin-knappar för redigera och ta bort */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary flex-fill"
                onClick={() => onEditProduct(product.id)}
              >
                <i className="bi bi-pencil"></i> Redigera
              </button>

              <button
                className="btn btn-outline-danger flex-fill"
                onClick={handleDelete}
              >
                <i className="bi bi-trash"></i> Ta bort
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
