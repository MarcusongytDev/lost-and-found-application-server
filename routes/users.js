const express = require('express');
const router = express.Router();

router.get(',', function(req, res, next) {

    let dataArray = [
        { name: "John", age: 12 },
        { name: "Lisa", age: 15 },
        { name: "Dave", age: 13 },
    ];

    res.json({
        data: dataArray
    });

});

module.exports = router;