// server.js – Huvudfil för backend-servern.
// Konfigurerar Express, CORS, routes och synkar databasen via Sequelize.

const express = require("express");
const cors = require("cors");
const db = require("./models");

// Importera route-moduler
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5000;

// Tillåt förfrågningar från frontend (Vite dev-server på port 5173)
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"]
}));

// Aktivera JSON-parsing av request body
app.use(express.json());

// Koppla routes till respektive bas-URL
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);
app.use("/cart", cartRoutes);
app.use("/users", userRoutes);

// Enkel root-endpoint för att verifiera att servern körs
app.get("/", (req, res) => {
  res.send("Server fungerar!");
});

// Starta servern och lyssna på angiven port
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.log("Server error:", err.message);
});

// Synkronisera databasmodeller med MySQL och skapa standardanvändare
db.sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("Database synced");
    const [user] = await db.User.findOrCreate({
      where: { id: 1 },
      defaults: { name: "Användare", email: "user@webshop.se" }
    });
    console.log("Default user ready (id: " + user.id + ")");
  })
  .catch((err) => console.log("Sync error:", err.message));
