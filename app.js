const express = require('express');
const router = require('./routes/index')

const connect = require("./schemas");
connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.use('/', router)

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
})
