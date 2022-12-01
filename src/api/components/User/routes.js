/** User routes */

// Import User Controller
const user_ctrl = require('./controller')

// Use Express Router
const express = require('express')
const router = express.Router()

router.get("/:userid", async (req, res) => {
    const userDetails = await user_ctrl.view(req.params.userid);
    if(userDetails === null) {
        res.status(404).json('NOT FOUND');
    }else {
        res.json(userDetails);
    }
});

module.exports = router 