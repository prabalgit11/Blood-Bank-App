const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({

    inventoryType: {
        type: String,
        required: [true, "Inventory type require"],
        enum: ["in", "out"],
    },
    bloodGroup: {
        type: String,
        required: [true, "Blood group is require"],
        enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
        type: Number,
        require: [true, "Blood quanity is require"],
    },
    email: {
        type: String,
        required: [true, "Donar Email is Required"],
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Organisation is require"],
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: function () {
            return this.inventoryType === "out";
        },
    },
    donar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: function () {
            return this.inventoryType === "in";
        },
    },
},
    { timestamps: true }
);
module.exports = mongoose.model("inventory", InventorySchema);