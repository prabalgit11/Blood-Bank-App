const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const UserSchema = require('../models/userModels')

//REGISTER CONTROLLER
const registerController = async (req, res) => {
    try {
        const exisitingUser = await UserSchema.findOne({ email: req.body.email });
        //validation
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "User ALready exists",
            });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        //rest data or create new user
        const user = new UserSchema(req.body);
        await user.save();
        return res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Register API",
            error,
        });
    }
};

//LOGIN CONTOLLER
const loginController = async (req, res) => {
    try {
        const user = await UserSchema.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid Credentials",
            });
        }
        //check role
        if (user.role !== req.body.role) {
            return res.status(500).send({
                success: false,
                message: "role dosent match",
            });
        }
        //compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials",
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "6h" });
        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Login API",
            error,
        });
    }
};

// GET CURRENT USER CONTROLLER 
const getCurrentUserController = async (req, res) => {
    try {
        const user = await UserSchema.findOne({ _id: req.body.userId });
        return res.status(200).send({
            success: true,
            message: "User Fetched Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "unable to get current user",
            error,
        });
    }
};


module.exports = { registerController, loginController, getCurrentUserController }