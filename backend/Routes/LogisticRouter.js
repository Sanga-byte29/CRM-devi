const express = require("express");
const router = express.Router();
const logisticsController = require("../Controllers/LogisticController");

router.post("/", logisticsController.createLogistics);
router.get("/", logisticsController.getAllLogistics);
router.get("/:orderId", logisticsController.getLogisticsByOrderId);
router.put("/:id", logisticsController.updateLogistics);
router.delete("/:id", logisticsController.deleteLogistics);

module.exports = router;
