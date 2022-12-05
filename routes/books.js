const express = require("express");
// const authMiddleware = require("../middlewares/authMiddleware");
const Books = require("../schemas/books");

const router = express.Router();

router.get("/books", async (req, res) => {
  const books = await Books.find();
  return res.status(200).send({ message: "Data buku ditemukan", data: books });
});

router.get("/books/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const book = await Books.findById(bookId).exec();

  if (!book) {
    return res
      .status(404)
      .send({ message: "Data buku tidak ditemukan", data: {} });
  } else {
    return res.status(200).send({ message: "Data buku ditemukan", data: book });
  }
});

router.post("/books", async (req, res) => {
  const {
    title,
    author,
    cover,
    newPrice,
    oldPrice,
    category,
    storeName,
    storeLocation,
    description,
    jumlahHalaman,
    tanggalTerbit,
    isbn,
    bahasa,
    penerbit,
    berat,
    lebar,
    panjang,
    information,
  } = req.body;

  await Books.create({
    title,
    author,
    cover,
    newPrice,
    oldPrice,
    category,
    storeName,
    storeLocation,
    description,
    jumlahHalaman,
    tanggalTerbit,
    isbn,
    bahasa,
    penerbit,
    berat,
    lebar,
    panjang,
    information,
  });
  return res
    .status(200)
    .send({ message: "Sebuah buku telah berhasil ditambahkan" });
});

module.exports = router;
