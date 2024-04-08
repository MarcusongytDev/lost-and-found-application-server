const express = require("express");
const router = express.Router();

const {
      getLostItems,
      postLostItem,
      postLostItemNotice,
} = require("../dao/ApplicationService");

// Debugging tool: Displays any routed function performed by this routes file
router.use(function(req, res, next) {
      console.log(req.url, "@", Date.now());
      next();
});



router.get("/get-lost-items", getLostItems);

router.post("/post-lost-item", postLostItem);

router.post("/post-lost-item-notice", postLostItemNotice)


module.exports = router;