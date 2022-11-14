/** User routes */

// Import User Controller
const user_ctrl = require('./controller')

// Use Express Router
const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.json(user_ctrl.view())
});

module.exports = router 