const express = require("express");
const StoreBooks = require("../schemas/storeBooks");
const Books = require("../schemas/books");

const router = express.Router();

router.get('/books/:bookId/store', async (req, res) => {
    const { bookId } = req.params;

    const storeList = await StoreBooks.find({ bookId });

    const book = await Books.findById(bookId).exec();

    const result = storeList.map(store => {
        const stokBuku = store.stokBuku;
        
        let stok = "Stok Tersedia";
        if (stokBuku === 0) {
            stok = "Stok Kosong"
        }

        return ({
            tokobookId: store._id,
            storeName: store.storeName,
            storeLocation: store.storeLocation,
            cover: book.cover,
            price: book.price,
            stokBuku,
            stok
        })
    });

    res.status(200).send({ data: result })
});

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