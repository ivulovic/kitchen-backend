const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { kitchenConnection } = require("../../connections/kitchen.connection");

const ProductSchema = new Schema({
  name: String,
  description: String,
  imageUrl: String,
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


const modelName = 'product';
const collectionName = 'products';

mongoose.model(modelName, ProductSchema, collectionName);

const ProductModel = kitchenConnection.model(modelName, collectionName);

module.exports = ProductModel;