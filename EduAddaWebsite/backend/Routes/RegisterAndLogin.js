const express = require('express');
const userModel = require('../Models/userModel');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const secret = "RESTAPI";

// Register Route
router.post("/register", [
    body('email').isEmail(),
    body('phoneNumber').isMobilePhone(),
    body('password').isLength({ min: 8 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, phoneNumber, password } = req.body;

        // Check if user already exists by email or phoneNumber
        const existingUser = await userModel.findOne({
            $or: [
                { email: email },
                { phoneNumber: phoneNumber }
            ]
        });

        if (existingUser) {
            return res.status(403).json({ error: "User already exists" });
        }

        // Hash password
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            // Create new user
            const newUser = await userModel.create({
                email: email,
                phoneNumber: phoneNumber,
                password: hash
            });

            return res.status(200).json({
                message: "Sign Up Successfully",
                user: newUser.email // Optionally send back user information
            });
        });
    } catch (err) {
        return res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
});

// Login Route
// Login Route
router.post("/", async (req, res) => {
    try {
        const { email, phoneNumber, password } = req.body;

        // Check if either email or phoneNumber is provided
        if (!email && !phoneNumber) {
            return res.status(400).json({
                error: "Email or Phone Number is required"
            });
        }

        // Find user by email or phoneNumber
        let user;
        if (email) {
            user = await userModel.findOne({ email: email });
        } else if (phoneNumber) {
            user = await userModel.findOne({ phoneNumber: phoneNumber });
        }

        // Handle case where user is not found
        if (!user) {
            return res.status(403).json({
                error: "Unknown User"
            });
        }

        // Compare passwords
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (result) {
                // Create JWT token
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // Token expires in 24 hours
                    data: { userId: user._id, email: user.email } // Include additional data as needed
                }, secret);

                return res.status(200).json({
                    message: "Login successful",
                    token: token,
                    user: user.email // Optionally send back user information
                });
            } else {
                return res.status(400).json({
                    error: "Invalid Password"
                });
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: "Failed",
            message: err.message
        });
    }
});

module.exports = router;