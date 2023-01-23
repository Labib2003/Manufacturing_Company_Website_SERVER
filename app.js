const express = require("express");
const cors = require("cors");
const toolRoutes = require("./routes/tool.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const reviewRoutes = require("./routes/review.routes");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/tools", toolRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
