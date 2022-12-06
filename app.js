const express = require('express');
const cors = require("cors");
const router = require('./routes/index')

const connect = require("./schemas");
connect();

const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', router)

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
})
