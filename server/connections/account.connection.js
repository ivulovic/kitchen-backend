const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connectionString = process.env.NODE_ENV === "production" ? process.env.ACCOUNT_CONNECTION_STRING : "mongodb://localhost:27017/pluoro";

const conn = mongoose.createConnection(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

conn.once("open", () => {
  console.log("Account, Connected to Database Successfully.")
});

module.exports = {
  pluoroConnection: conn,
}