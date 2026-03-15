// ProductsPage.jsx – Visar en lista av alla produkter.
// Hämtar produktdata från backend och renderar ProductCard-komponenter.

import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

function ProductsPage({ openProduct, onCartUpdated, onEditProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hämtar alla produkter från backend vid sidladdning
  const loadProducts = () => {
    setLoading(true);
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("Kunde inte hämta produkter"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid px-4 mt-4 text-white">
        <h1>Produkter</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid px-4 mt-4 text-white">
        <h1>Produkter</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 mt-4">
      <h1 className="mb-4 text-white">Produkter</h1>

      <div className="row g-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            openProduct={openProduct}
            onCartUpdated={onCartUpdated}
            onEditProduct={onEditProduct}
            onProductDeleted={loadProducts}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
