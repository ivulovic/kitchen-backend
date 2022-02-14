const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { kitchenConnection } = require("../../connections/kitchen.connection");

const StoreSchema = new Schema({
  name: String,
  description: String,
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


const modelName = 'store';
const collectionName = 'stores';

mongoose.model(modelName, StoreSchema, collectionName);

const StoreModel = kitchenConnection.model(modelName, collectionName);

module.exports = StoreModel;