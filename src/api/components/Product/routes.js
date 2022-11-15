/* Product route */

/* Product controller */
const prod_ctrl = require('./controller')

const express = require('express')
const router = express.Router()

router.get("/products/getAll", (req, res) => {
    res.send("Products")
    /* 
        The actual products
    */
});

router.get("/products/owned/:username", (req, res) => {
    res.send(req.params.username)
    /* how to access particular username's products owned and
    where are they stored? 
    */
});

module.exports = { router }