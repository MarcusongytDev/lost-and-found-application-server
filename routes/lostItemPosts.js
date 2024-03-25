const express = require('express');
const router = express.Router();

// Function to post lost item into database
router.post("/lostItemNotice", async (req, res) => {
    const lostItem = req.body; // Obtain lost item data from the request body
    // Syntax for creating entry into the lost item database
    res.json(lostItem);

})

module.exports = router;