const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const Carts = require("../schemas/cart");
const StoreBooks = require("../schemas/storeBooks");
const Books = require("../schemas/books");

const router = express.Router();

router.post('/cart', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    const { tokobookId, jumlah } = req.body;

    const userId = user._id;
    const selectedBook = await StoreBooks.findById(tokobookId).exec();
    const bookId = selectedBook.bookId;
    const book = await Books.findById(bookId).exec();
    const harga = book.newPrice;
    const totalHarga = jumlah * harga;

    await Carts.create({
        userId,
        tokobookId,
        jumlah,
        totalHarga
    });

    return res.status(201).send({message: "Buku berhasil dimasukkan ke tas belanja."});
});

module.exports = router;