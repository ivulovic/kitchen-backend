const router = require("express-promise-router")();
const { validateBody, validateParams } = require("../../helpers/route.helper");
const productSchema = require("../../schemas/product/product.schema");
const commonSchema = require("../../schemas/common.schema");
const tokenMiddleware = require("../../middlewares/token.middleware");
const ProductController = require("../../controllers/product/product.controller");

router.use(tokenMiddleware);

router
  .route("/:id")
  .get([validateParams(commonSchema.objectId, "id")], ProductController.list) // storeId
  .post([validateParams(commonSchema.objectId, "id"), validateBody(productSchema.create)], ProductController.create) // storeId
  .patch([validateParams(commonSchema.objectId, "id"), validateBody(productSchema.update)], ProductController.update) // productId
  .delete([validateParams(commonSchema.objectId, "id")], ProductController.remove); // productId
module.exports = router;
