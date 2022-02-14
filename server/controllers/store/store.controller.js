const StoreModel = require("../../models/store/store.model");
const AccountModel = require("../../models/account/account.model");

module.exports = {
  list: async (req, res) => {
    const arr = await StoreModel.find({}, { modifiedBy: 0, createdBy: 0, __v: 0 }).sort("-modifiedAt");
    res.status(200).send(arr);
  },
  create: async (req, res) => {
    const content = req.value.body;
    content.createdAt = Date.now();
    content.modifiedAt = Date.now();
    content.createdBy = req.decoded.user;
    content.modifiedBy = req.decoded.user;
    const objToSave = new StoreModel(content);
    let savedObj = await objToSave.save();
    res.status(200).send(savedObj);
  },
  update: async (req, res) => {
    const { id } = req.value.params;
    const content = req.value.body;
    content.modifiedBy = req.decoded.user;
    content.modifiedAt = Date.now();
    const objToSave = await StoreModel.findByIdAndUpdate(id, content);
    res.status(200).send({ ...objToSave._doc, ...content });
  },
  remove: async (req, res) => {
    const { id } = req.value.params;
    await StoreModel.findByIdAndRemove(id);
    res.status(200).send({ _id: id });
  },
};
