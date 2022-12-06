const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    tokobookId: {
        type: String,
        required: true
    },
    jumlah: {
        type: Number,
        required: true
    },
    totalHarga: {
        type: Number,
        required: true
    }
},{
    timestamps:true
});

cartSchema.virtual("itemId").get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Carts', cartSchema)