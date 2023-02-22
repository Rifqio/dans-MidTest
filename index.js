const express = require("express");
const mongoose = require("mongoose");
const client = require("./config/Redis");
const cors = require("cors");
require("dotenv").config();
// Routes
const AuthRoute = require("./routes/AuthRoute");
const ProductRoute = require("./routes/ProductRoute");
const UserRoute = require("./routes/UserRoute");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/api/auth", AuthRoute);
app.use("/api/data", ProductRoute);
app.use("/api/me", UserRoute);
mongoose.connect(process.env.MONGO_URI, () =>
  console.log("Connected to mongo")
);
try {
  const redis = async () => {
    await client.on("connect", () => {
      console.log("Redis connection established");
    });
  };
  redis();
} catch (error) {
  console.log(error.message);
}
app.listen(5000, () => console.log("listening on port 5000"));
