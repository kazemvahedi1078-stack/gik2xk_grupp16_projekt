// App.jsx – Huvudkomponent som hanterar navigering mellan vyer.
// Använder state-baserad sidväxling och skickar callbacks för att
// uppdatera varukorgens antal i navbaren.

import { useEffect, useState } from "react";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductFormPage from "./pages/ProductFormPage";
import Navbar from "./components/Navbar";
import { getCart } from "./services/api";

function App() {
  const [page, setPage] = useState("products");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Hämtar varukorgens totala antal produkter för att visa i navbaren
  const loadCartCount = async () => {
    try {
      const cart = await getCart(1);
      const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      console.log("Cart count error:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    loadCartCount();
  }, []);

  return (
    <div>
      <Navbar
        setPage={setPage}
        cartCount={cartCount}
        onNewProduct={() => {
          setEditProductId(null);
          setPage("productForm");
        }}
      />

      {/* Produktlista – huvudvy */}
      {page === "products" && (
        <ProductsPage
          openProduct={(id) => {
            setSelectedProduct(id);
            setPage("detail");
          }}
          onCartUpdated={loadCartCount}
          onEditProduct={(id) => {
            setEditProductId(id);
            setPage("productForm");
          }}
        />
      )}

      {/* Varukorg */}
      {page === "cart" && (
        <CartPage onCartUpdated={loadCartCount} goBack={() => setPage("products")} />
      )}

      {/* Produktdetaljvy med recensioner */}
      {page === "detail" && selectedProduct && (
        <ProductDetailPage
          productId={selectedProduct}
          goBack={() => setPage("products")}
          onCartUpdated={loadCartCount}
        />
      )}

      {/* Formulär för att skapa/redigera produkt (admin) */}
      {page === "productForm" && (
        <ProductFormPage
          editProductId={editProductId}
          goBack={() => setPage("products")}
        />
      )}
    </div>
  );
}

export default App;
