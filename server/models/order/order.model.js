const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { kitchenConnection } = require("../../connections/kitchen.connection");

const OrderSchema = new Schema({
  quantity: String,
  status: String,
  delivery: Boolean,
  description: String,
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
  modifiedBy: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
  createdAt: Number,
  modifiedAt: Number,
});

const modelName = 'order';
const collectionName = 'orders';

mongoose.model(modelName, OrderSchema, collectionName);

const OrderModel = kitchenConnection.model(modelName, collectionName);

module.exports = OrderModel;