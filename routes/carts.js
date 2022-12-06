const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const Carts = require("../schemas/cart");
const Books = require("../schemas/books");
const storeBooks = require("../schemas/storeBooks");

const router = express.Router();

router.post('/cart', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    const { tokobookId, jumlah } = req.body;
    const userId = user._id;

    await Carts.create({
        userId,
        tokobookId,
        jumlah
    });

    return res.status(201).send({ message: "Buku berhasil dimasukkan ke tas belanja." });
});

router.get('/cart', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    const userId = user._id;

    const itemList = await Carts.find({ userId });
    const tokobookIds = itemList.map(item => item.tokobookId);

    const tokobooksListbyId = await storeBooks.find({ _id: tokobookIds })
        .exec()
        .then((item) =>
            item.reduce(
                (prev, i) => ({
                    ...prev,
                    [i._id]: i,
                }),
                {}
            )
        );

    const bookIds = await storeBooks.find({ _id: tokobookIds })
        .exec()
        .then((item) =>
            item.reduce(
                (prev, i) => ([
                    ...prev,
                    i.bookId
                ]),
                []
            )
        );

    const booksListbyId = await Books.find({ _id: bookIds })
        .exec()
        .then((item) =>
            item.reduce(
                (prev, i) => ({
                    ...prev,
                    [i._id]: i,
                }),
                {}
            )
        );

    const result = itemList.map(item => {
        const tokobook = tokobooksListbyId[item.tokobookId];
        const book = booksListbyId[tokobook.bookId];
        return ({
            storeName: tokobook.storeName,
            title: book.title,
            cover: book.cover,
            berat: book.berat,
            newPrice: book.newPrice,
            oldPrice: book.oldPrice,
            jumlah: item.jumlah,
            stokBuku: tokobooksListbyId[item.tokobookId].stokBuku,
            createdAt: item.createdAt
        })
    });

    const sortedResult = result.sort((a, b) => {
        const date1 = a.createdAt;
        const date2 = b.createdAt;
        if (date1 < date2) {
            return -1
        } else if (date1 > date2) {
            return 1
        } else {
            return 1
        }
    });

    res.status(200).send({ cart: sortedResult });
})

module.exports = router;