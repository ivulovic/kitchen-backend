const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5002;
app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const storeRoutes = require("./server/routes/store/store.routes");
const productRoutes = require("./server/routes/product/product.routes");
const orderRoutes = require("./server/routes/order/order.routes");
const deliveryRoutes = require("./server/routes/delivery/delivery.routes");

// ROUTES
app.use("/api/store", storeRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/delivery", deliveryRoutes);

app.listen(port, () => console.log(`Kitchen, Listening on port ${port}`));
module.exports = app;
