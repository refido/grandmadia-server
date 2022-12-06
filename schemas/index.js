const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  mongoose
    // .connect("mongodb://localhost:27017/grandmadia") //local
    .connect(`mongodb+srv://revido:${process.env.DB_PASSWORD}@cluster0.5iwafmj.mongodb.net/grandmadia?retryWrites=true&w=majority`)
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error", err);
});

module.exports = connect;
