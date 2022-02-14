const router = require("express-promise-router")();
const { validateBody, validateParams } = require("../../helpers/route.helper");
const orderSchema = require("../../schemas/order/order.schema");
const commonSchema = require("../../schemas/common.schema");
const tokenMiddleware = require("../../middlewares/token.middleware");
const OrderController = require("../../controllers/order/order.controller");

router.use(tokenMiddleware);

router.route("/").get(OrderController.list);

router.route("/").post([validateBody(orderSchema.create)], OrderController.create);

router
  .route("/:id")
  .patch([validateParams(commonSchema.objectId, "id"), validateBody(orderSchema.update)], OrderController.update)
  .delete([validateParams(commonSchema.objectId, "id")], OrderController.remove);
module.exports = router;
