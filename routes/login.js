const express = require("express");
const Joi = require("joi");
const Users = require("../schemas/users");
const jwt = require("jsonwebtoken");

const router = express.Router();
require("dotenv").config();

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = await loginSchema.validateAsync(req.body);
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send({
        errorMessage:
          "Akun tidak ditemukan. Silakan masuk dengan akun yang terdaftar.",
      });
    } else {
      console.log(user);
    }

    const userId = user?._id;

    if (password !== user?.password) {
      return res.status(400).send({
        errorMessage: "Password salah.",
      });
    }

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);

    const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY, {
      expiresIn: "3600s",
    });

    res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
      expires: expires,
    });
    return res.status(200).json({ message: "Login berhasil", token: token });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).send({
      errorMessage: "Format data tidak valid.",
    });
  }
});

module.exports = router;
