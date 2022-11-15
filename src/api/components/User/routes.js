/** User routes */

// Import User Controller
const user_ctrl = require('./controller')

// Use Express Router
const express = require('express')
const router = express.Router()

router.get("/users/:userid", (req, res) => {
    res.json(user_ctrl.view())
    // res.send(req.params.userid)'s info ??
});

module.exports = router 