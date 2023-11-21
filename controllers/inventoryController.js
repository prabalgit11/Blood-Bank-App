const inventoryModels = require('../models/inventoryModels');
const UserSchema = require('../models/userModels')

// create inventory
const createInventoryController = async (req, res) => {
    try {
        const { email, inventoryType } = req.body;
        //validation
        const user = await UserSchema.findOne({ email });
        if (!user) {
            throw new Error("User Not Found");
        }
        if (inventoryType === "in" && user.role !== "donar") {
            throw new Error("Not a donar account");
        }
        if (inventoryType === "out" && user.role !== "hospital") {
            throw new Error("Not a hospital account");
        }
        //save record
        const inventory = new inventoryModels(req.body);
        await inventory.save();
        return res.status(201).send({
            success: true,
            message: "New Blood Record Added"
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Create Inventory API",
            error
        });

    }

}

// get all blood record
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModels.find({ organisation: req.body.userId }).populate("donar").populate("hospital").sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            message: "Get All Record Successfully",
            inventory
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Get All Blood Records API",
            error
        })

    }
}
module.exports = { createInventoryController, getInventoryController }