const express = require("express");
const { getServices, addService, updateService, deleteService } = require("../controllers/serviceController");

const router = express.Router();

router.get("/services", getServices);
router.post("/services", addService);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

module.exports = router;
