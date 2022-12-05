const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps:true
});

userSchema.virtual("userId").get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Users', userSchema)