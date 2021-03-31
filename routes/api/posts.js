const express = require('express');
const router = express.Router();

// @route GET /api/posts/test
// @desc test posts route
// @access Public
router.get('/test', (req, res , next) => {
    res.json({
        msg: "hello in rOUER"
    })
})

module.exports = router;