const ProductModel = require("../../models/product/product.model");

module.exports = {
  create: async (req, res) => {
    const { id: storeId } = req.value.params;
    const content = req.value.body;
    content.storeId = storeId;
    content.createdAt = Date.now();
    content.modifiedAt = Date.now();
    content.createdBy = req.decoded.user;
    content.modifiedBy = req.decoded.user;
    const objToSave = new ProductModel(content);
    let savedObj = await objToSave.save();
    res.status(200).send(savedObj);
  },
  list: async (req, res) => {
    const { id: storeId } = req.value.params;
    const arr = await ProductModel.find({ storeId }, { modifiedBy: 0, createdBy: 0, __v: 0 }).sort("-modifiedAt");
    res.status(200).send(arr);
  },
  remove: async (req, res) => {
    const { id } = req.value.params;
    await ProductModel.findByIdAndRemove(id);
    res.status(200).send({ _id: id });
  },
  update: async (req, res) => {
    const { id } = req.value.params;
    const content = req.value.body;
    content.modifiedBy = req.decoded.user;
    content.modifiedAt = Date.now();
    const objToSave = await ProductModel.findByIdAndUpdate(id, content);
    res.status(200).send({ ...objToSave._doc, ...content });
  },
};
