const express = require("express");
const router = express.Router();
const multer = require("multer");
// Initialize multer for image upload
const upload = multer({ storage: multer.memoryStorage() });

//-------------------------------- Routed Modules Below --------------------------------//

const {
      getLostItems,
      postLostItem,
      postLostItemNotice,
} = require("../dao/ApplicationService");

//------Debugging tool: Displays any routed function performed by this routes file------//
router.use(function(req, res, next) {
      console.log(req.url, "@", Date.now());
      next();
});


//---------------------------------- Routes Below --------------------------------------//
router.get("/get-lost-items", getLostItems);

router.post("/post-lost-item", upload.single('photo'), postLostItem);

router.post("/post-lost-item-notice", postLostItemNotice);


module.exports = router;