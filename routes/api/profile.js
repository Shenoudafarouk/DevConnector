const express = require('express');
const router = express.Router();

// @route GET /api/profile/test
// @desc test profile route
// @access Public
router.get('/test', (req, res , next) => {
    res.json({
        msg: "hello in rOUER"
    })
})

module.exports = router;