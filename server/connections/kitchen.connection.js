const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connectionString = process.env.NODE_ENV === "production" ? process.env.KITCHEN_CONNECTION_STRING : "mongodb://localhost:27017/kitchen";

const conn = mongoose.createConnection(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

conn.once("open", () => {
  console.log("Kitchen, Connected to Database Successfully.")
});

module.exports = {
  kitchenConnection: conn,
}