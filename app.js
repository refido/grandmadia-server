const express = require('express');
const router = require('./routes/index')

const connect = require("./schemas");
connect();

// const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

// app.use(cookieParser());
app.use(express.json())

app.use('/', router)

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
})
