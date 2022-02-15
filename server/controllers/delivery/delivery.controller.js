const { AccountModel } = require("../../models");
const DeliveryModel = require("../../models/delivery/delivery.model");
const StoreModel = require("../../models/store/store.model");

module.exports = {
  list: async (req, res) => {
    var today = new Date().setHours(0,0,0);
    let arr = await DeliveryModel.find({ createdAt: { $gt: today } }, { modifiedBy: 0, __v: 0 })
                                .sort("-modifiedAt")
                                .populate({
                                  path: "storeId",
                                });
    for(let i = 0; i < arr.length; i++){
      arr[i].createdBy = await AccountModel.findById(arr[i].createdBy, { password: 0, emailConfirmed: 0 });
    }
    res.status(200).send(arr);
  },
  create: async (req, res) => {
    const content = req.value.body;
    content.createdAt = Date.now();
    content.modifiedAt = Date.now();
    content.createdBy = req.decoded.user;
    content.modifiedBy = req.decoded.user;
    const objToSave = new DeliveryModel(content);
    let savedObj = await objToSave.save();
    savedObj.storeId = await StoreModel.findOne(savedObj.storeId);
    savedObj.createdBy = await AccountModel.findById(savedObj.createdBy, { password: 0, emailConfirmed: 0 });
    res.status(200).send(savedObj);
  },
  remove: async (req, res) => {
    const { id } = req.value.params;
    await DeliveryModel.findByIdAndRemove(id);
    res.status(200).send({ _id: id });
  },
  update: async (req, res) => {
    const { id } = req.value.params;
    const content = req.value.body;
    content.modifiedBy = req.decoded.user;
    content.modifiedAt = Date.now();
    const objToSave = await DeliveryModel.findByIdAndUpdate(id, content).populate("storeId");
    objToSave.createdBy = await AccountModel.findById(objToSave.createdBy, { password: 0, emailConfirmed: 0 });
    // objToSave.modifiedBy = await AccountModel.findById(objToSave.createdBy, { password: 0, emailConfirmed: 0 });
    res.status(200).send({ ...objToSave._doc, ...content });
  },
};
