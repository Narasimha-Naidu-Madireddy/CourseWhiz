const express = require("express");

const router = express.Router();


const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");


const {
    uploadDocument
}=require("../controllers/documentController");



router.post(
    "/:courseId/upload",
    protect,
    upload.single("file"),
    uploadDocument
);



module.exports=router;