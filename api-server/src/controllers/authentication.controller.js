const accountUtils = require('../utils/account.util');
const accountService = require("../services/account.service");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const { SECRET_KEY, MAIL } = require('../configs/main.config');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserModel = require("../models/user.model");
const nodemailer = require("nodemailer");
const encryptionUtil = require('../utils/encryption.util');
const accountConfig = require('../configs/account.config')

exports.signup = async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    const errorMsg = [];

    await accountUtils.checkIfUsernameExists(username, errorMsg);
    accountUtils.validateUsername(username, errorMsg);

    await accountUtils.checkIfEmailExists(email, errorMsg);
    accountUtils.validateEmail(email, errorMsg);

    accountUtils.validatePassword(password, errorMsg);

    if (errorMsg.length > 0) {
        res.status(400).json({ status: "fail", message: errorMsg })
        return
    }

    try {
        await accountUtils.createUnactivatedUser(username, email, password);
        await accountUtils.sendActivationEmail(username, email);
        res.status(200).json({ status: "ok", message: "Account created" });
    } catch (err) {
        res.status(500).json({ status: "fail", message: ["Internal server error"] });
    }
}

exports.signin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    await accountService.getUserByUsername(username).then(user => {
        if (!user) {
            res.status(400).json({ message: 'Invalid email or password' });
        } else {
            bcrypt.compare(password, user.password).then(result => {
                if(!user.activated){
                    res.status(400).json({ message: 'Account is not activated' });
                    return
                }
                if (result) {
                    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '2 days' });
                    res.status(200).json({
                        status: 'ok',
                        token: token,
                        username: username,
                        userId: user._id
                    });
                } else {
                    res.status(400).json({ message: 'Invalid email or password' });
                }
            }).catch(error => console.error('Error comparing passwords:', error));
        }
    });


}

// use JWT to auth -> maybe blacklist token when logout (implement this later)
exports.logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error logging out');
        }
        res.send('Logged out successfully');
    });
}

exports.forgotPassword = async (req, res) => {
    let email = req.body.email;
    UserModel.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.send({ Status: "User not existed" })
            }
            const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1d" })
            res.status(200).json({ token: token })
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: MAIL.FROM,
                    pass: MAIL.PASSWORD
                }
            });
            var mailOptions = {
                from: MAIL.FROM,
                to: req.body.email,
                subject: 'Reset Password Link',
                text: `http://localhost:5173/reset-password/${user._id}`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    return res.send({ Status: "Success" })
                }
            });
        })
}

exports.resetPassword = async (req, res) => {
    const { id, token, password } = req.body
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error with token" })
        } else {
            encryptionUtil.bcryptHash(password, accountConfig.password.hashRounds)
                .then(newPassword => {
                    UserModel.findByIdAndUpdate(id, { password: newPassword })
                        .then(u => res.send({ Status: "Success" }))
                        .catch(err => res.send({ Status: err }))
                })
                .catch(err => res.send({ Status: err }))
        }
    })
}