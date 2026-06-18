const express = require("express");
const cors = require("cors");
require("dotenv").config();

const reviewRoutes = require("./routes/reviewRoutes");
require("./db");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Product Review System API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});