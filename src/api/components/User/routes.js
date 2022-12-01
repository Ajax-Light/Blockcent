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

router.get("/", async (req, res) => {
    res.json(await user_ctrl.viewAll());
});

router.post("/create", async (req, res) => {
    const success = await user_ctrl.create(req.body);
    if(success) {
        res.status(200).json({"success" : true});
    }else {
        res.status(500).json({"success" : false});
    }
});

router.put("/transfer/:from-:to-:points", async (req, res) => {
    const success = await user_ctrl.transfer(req.params.from, req.params.to, req.params.points);
    if(success) {
        res.status(200).json({"success" : true});
    }else {
        res.status(500).json({"success" : false});
    }
});

module.exports = router 