// Navbar.jsx – Navigeringsfält högst upp på sidan.
// Innehåller länkar till produktlistan, varukorgen och knapp för att skapa ny produkt.

function Navbar({ setPage, cartCount, onNewProduct }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span
        className="navbar-brand"
        style={{ cursor: "pointer" }}
        onClick={() => setPage("products")}
      >
        My Webshop
      </span>

      <div className="d-flex gap-2">
        <button
          className="btn btn-outline-light"
          onClick={() => setPage("products")}
        >
          Produkter
        </button>

        {/* Admin-knapp för att skapa ny produkt */}
        <button
          className="btn btn-outline-success"
          onClick={onNewProduct}
        >
          <i className="bi bi-plus-lg"></i> Ny produkt
        </button>

        <button
          className="btn btn-outline-light"
          onClick={() => setPage("cart")}
        >
          <i className="bi bi-cart3"></i> ({cartCount})
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
