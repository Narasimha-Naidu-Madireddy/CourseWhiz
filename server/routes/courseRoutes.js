const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  addCourse,
  getAllCourses,
  getSingleCourse,
  editCourse,
  removeCourse,
} = require("../controllers/courseController");

router.post("/", protect, addCourse);
router.get("/", protect, getAllCourses);
router.get("/:id", protect, getSingleCourse);
router.put("/:id", protect, editCourse);
router.delete("/:id", protect, removeCourse);

module.exports = router;