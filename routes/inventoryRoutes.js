const express = require("express")
const { createInventoryController, getInventoryController } = require("../controllers/inventoryController");
const authMiddleware = require("../middlewares/authMiddleware");



const router = express.Router();

// CREATE INVENTORY || POST
router.post("/create-inventory", authMiddleware, createInventoryController);

// GET ALL BLOOD RECORD || GET
router.get("/get-inventory", authMiddleware, getInventoryController);
module.exports = router;