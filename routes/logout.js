const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
require('dotenv').config();

router.get('/logout', authMiddleware, async (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200).send({ message: "Berhasil logout" })
})

module.exports = router;