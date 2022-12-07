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

    const selectedbook = await storeBooks.findById(tokobookId).exec();
    const stokBuku = selectedbook.stokBuku;

    if (jumlah > stokBuku) {
        return res.status(400).send({ message: "Jumlah melebihi stok buku"})
    }

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
            itemId: item._id,
            storeName: tokobook.storeName,
            title: book.title,
            cover: book.cover,
            berat: book.berat,
            price: book.price,
            jumlah: item.jumlah,
            stokBuku: tokobooksListbyId[item.tokobookId].stokBuku,
            createdAt: item.createdAt
        })
    });

    result.sort((a, b) => { a.createdAt - b.createdAt});

    res.status(200).send({ cart: result });
});

router.patch('/cart/:itemId', authMiddleware, async (req, res) => {
    const { itemId } = req.params;
    const { jumlah } = req.body;

    const existCart = await Carts.findById(itemId).exec();

    if (!existCart) {
        return res.status(400).send({ message: "Item tidak ditemukan"})
    }

    const tokobookId = existCart.tokobookId;
    const selectedbook = await storeBooks.findById(tokobookId).exec();
    const stokBuku = selectedbook.stokBuku;

    if (jumlah > stokBuku) {
        return res.status(400).send({ message: "Jumlah melebihi stok buku"})
    }

    if (jumlah < 1) {
        return res.status(400).send({ message: "Jumlah buku minimal 1"});
    }

    existCart.jumlah = jumlah;
    await existCart.save();

    return res.status(200).send({ message: "Jumlah pesanan berhasil diubah."})
});

router.delete('/cart/:itemId', authMiddleware, async (req, res) => {
    const { itemId } = req.params;

    const existCart = await Carts.findById(itemId).exec();

    if (!existCart) {
        return res.status(400).send({ message: "Item tidak ditemukan"})
    }

    await existCart.delete();
    res.status(200).send({ message: "Pesanan berhasil dihapus"})
});

router.delete('/cart', authMiddleware, async (req, res) => {
    const { itemIds } = req.body;

    const existCart = await Carts.find({ _id: itemIds });

    if (existCart.length !== itemIds.length) {
        return res.status(400).send({ message: "Terdapat item yang tidak dapat ditemukan."})
    }

    for (const cart of existCart) {
        await cart.delete();
    }

    res.status(200).send({ message: "Pesanan berhasil dihapus."})
});

module.exports = router;