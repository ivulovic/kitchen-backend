const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { pluoroConnection } = require("../../connections/account.connection");

const AccountSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  emailConfirmed: Boolean,
  password: String,
});

const modelName = 'account';
const collectionName = 'accounts';

mongoose.model(modelName, AccountSchema, collectionName);

const AccountModel = pluoroConnection.model(modelName, collectionName);

module.exports = AccountModel;