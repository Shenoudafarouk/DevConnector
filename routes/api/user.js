const express = require('express');
const router = express.Router();

// @route GET /api/user/test
// @desc test users route
// @access Public
router.get('/test', (req, res , next) => {
    res.json({
        msg: "hello in rOUER"
    })
})

module.exports = router;