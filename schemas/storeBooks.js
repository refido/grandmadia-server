const mongoose = require('mongoose')

const storebookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    storeLocation: {
        type: String,
        required: true
    },
    stokBuku: {
        type: Number,
        required: true
    }
},{
    timestamps:true
});

storebookSchema.virtual("tokobookId").get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('StoreBooks', storebookSchema)