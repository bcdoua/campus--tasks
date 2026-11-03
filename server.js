const express = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "campus",
  password: process.env.DB_PASSWORD || "dev-password",
  database: process.env.DB_NAME || "campus",
});

const app = express();

app.get("/health", async (req, res) => {
  try {
    await pool.query("select 1");
    res.json({ status: "ok", db: "up" });
  } catch (err) {
    console.error("Connexion DB impossible :", err.message);
    res.status(503).json({ status: "error", db: "down" });
  }
});

app.listen(8080, "0.0.0.0", () => {
  console.log("Campus Tasks écoute sur 0.0.0.0:8080");
});