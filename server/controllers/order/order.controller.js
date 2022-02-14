const { AccountModel } = require("../../models");
const OrderModel = require("../../models/order/order.model");

module.exports = {
  list: async (req, res) => {
    var today = new Date().setHours(0,0,0);
    let arr = await OrderModel.find({ createdAt: { $gt: today } }, { modifiedBy: 0, __v: 0 })
                                .sort("-modifiedAt")
                                .populate({
                                  path: "productId",
                                  populate: {
                                    path: 'storeId'
                                  }
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
    const objToSave = new OrderModel(content);
    let savedObj = await objToSave.save();
    res.status(200).send(savedObj);
  },
  remove: async (req, res) => {
    const { id } = req.value.params;
    await OrderModel.findByIdAndRemove(id);
    res.status(200).send({ _id: id });
  },
  update: async (req, res) => {
    const { id } = req.value.params;
    const content = req.value.body;
    content.modifiedBy = req.decoded.user;
    content.modifiedAt = Date.now();
    const objToSave = await OrderModel.findByIdAndUpdate(id, content);
    res.status(200).send({ ...objToSave._doc, ...content });
  },
};
