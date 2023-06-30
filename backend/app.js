const express = require("express");
const { db } = require('./db/db')
const { readdirSync } = require('fs');
const app = express()
require("dotenv").config()
const cors = require('cors');

app.use(cors())

const PORT = process.env.PORT;

//middlewares
app.use(express.json());

//routes
readdirSync('./routes').map((route) => {
    app.use('/api/v1', require('./routes/' + route));
})


const Server = () => {
    db();
    app.listen(PORT, () => {
        console.log("Listening on port: ", PORT);
    })
}

Server();