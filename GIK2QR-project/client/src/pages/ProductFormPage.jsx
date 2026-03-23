// ProductFormPage.jsx – Formulär för att skapa eller redigera en produkt.
// Används av administratörer för att hantera produktutbudet.
// Om editProductId skickas in laddas befintlig produktdata för redigering.

import { useEffect, useState } from "react";
import { createProduct, updateProduct, getProduct } from "../services/api";

function ProductFormPage({ editProductId, goBack }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isEditing = !!editProductId;

  // Om vi redigerar en produkt, hämta dess data från backend
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      getProduct(editProductId)
        .then((data) => {
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price);
          setImageUrl(data.imageUrl || "");
        })
        .catch(() => setMessage("Kunde inte hämta produktdata"))
        .finally(() => setLoading(false));
    }
  }, [editProductId]);

  // Skickar formulärdata till backend (POST eller PUT beroende på läge)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name || !description || !price) {
      setMessage("Namn, beskrivning och pris krävs");
      return;
    }

    try {
      if (isEditing) {
        await updateProduct(editProductId, {
          name,
          description,
          price: parseFloat(price),
          imageUrl
        });
        setMessage("Produkt uppdaterad!");
      } else {
        await createProduct({
          name,
          description,
          price: parseFloat(price),
          imageUrl
        });
        setMessage("Produkt skapad!");
        setName("");
        setDescription("");
        setPrice("");
        setImageUrl("");
      }
    } catch (error) {
      console.log("Product form error:", error);
      setMessage("Fel: " + error.message + ". Kontrollera att servern körs!");
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4 text-white">
      <button className="btn btn-outline-light mb-3" onClick={goBack}>
        <i className="bi bi-arrow-left"></i> Tillbaka
      </button>

      <h1 className="mb-4">{isEditing ? "Redigera produkt" : "Skapa ny produkt"}</h1>

      {message && (
        <div className={`alert ${message.includes("!") ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Produktnamn</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ange produktnamn"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Beskrivning</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Beskriv produkten"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Pris (kr)</label>
          <input
            type="number"
            className="form-control"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Bild-URL (valfritt)</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/bild.jpg"
          />
        </div>

        {imageUrl && (
          <div className="mb-3">
            <p className="form-label">Förhandsvisning:</p>
            <img
              src={imageUrl}
              alt="Förhandsvisning"
              className="img-fluid rounded"
              style={{ maxHeight: "200px", objectFit: "cover" }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-light">
          {isEditing ? "Spara ändringar" : "Skapa produkt"}
        </button>
      </form>
    </div>
  );
}

export default ProductFormPage;
