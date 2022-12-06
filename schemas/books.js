const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    jumlahHalaman: {
      type: String,
      required: true,
    },
    tanggalTerbit: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    bahasa: {
      type: String,
      required: true,
    },
    penerbit: {
      type: String,
      required: true,
    },
    berat: {
      type: String,
      required: true,
    },
    lebar: {
      type: String,
      required: true,
    },
    panjang: {
      type: String,
      required: true,
    },
    information: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.virtual("bookId").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("Books", bookSchema);
