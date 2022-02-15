const router = require("express-promise-router")();
const { validateBody, validateParams } = require("../../helpers/route.helper");
const deliverySchema = require("../../schemas/delivery/delivery.schema");
const commonSchema = require("../../schemas/common.schema");
const tokenMiddleware = require("../../middlewares/token.middleware");
const DeliveryController = require("../../controllers/delivery/delivery.controller");

router.use(tokenMiddleware);

router.route("/").get(DeliveryController.list);

router.route("/").post([validateBody(deliverySchema.create)], DeliveryController.create);

router
  .route("/:id")
  .patch([validateParams(commonSchema.objectId, "id"), validateBody(deliverySchema.update)], DeliveryController.update)
  .delete([validateParams(commonSchema.objectId, "id")], DeliveryController.remove);
module.exports = router;
