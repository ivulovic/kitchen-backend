const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { kitchenConnection } = require("../../connections/kitchen.connection");

const OrderSchema = new Schema({
  description: String,
  isDelivered: Boolean,
  storeId: {
    type: Schema.Types.ObjectId,
    ref: "store",
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

const modelName = 'delivery';
const collectionName = 'delivery';

mongoose.model(modelName, OrderSchema, collectionName);

const OrderModel = kitchenConnection.model(modelName, collectionName);

module.exports = OrderModel;