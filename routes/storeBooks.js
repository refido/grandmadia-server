const express = require("express");
const StoreBooks = require("../schemas/storeBooks");

const router = express.Router();

router.post("/StoreBooks/:bookId", async (req, res) => {
    const { bookId } = req.params;
    const {
        storeName,
        storeLocation,
        stokBuku,
    } = req.body;

    await StoreBooks.create({
        bookId,
        storeName,
        storeLocation,
        stokBuku,
    });
    return res
        .status(201)
        .send({ message: "Data berhasil ditambahkan" });
});

module.exports = router;