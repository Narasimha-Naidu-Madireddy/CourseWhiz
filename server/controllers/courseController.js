const {
  createCourse,
  getCoursesByUser,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../services/courseService");


// Create Course
const addCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and Description are required",
      });
    }

    const result = await createCourse({
      title,
      description,
      createdBy: req.user.id,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Course Created Successfully",
      courseId: result.insertedId,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// Get All Courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await getCoursesByUser(req.user.id);

    res.json(courses);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// Get Single Course
const getSingleCourse = async (req, res) => {
  try {

    const course = await getCourseById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }


    if (course.createdBy !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }


    res.json(course);


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};



// Update Course
const editCourse = async (req, res) => {

  try {

    const course = await getCourseById(req.params.id);


    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }


    if (course.createdBy !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }


    const { title, description } = req.body;


    await updateCourse(req.params.id, {
      title,
      description,
    });


    res.json({
      message: "Course Updated Successfully",
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};




// Delete Course
const removeCourse = async (req, res) => {

  try {

    const course = await getCourseById(req.params.id);


    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }


    if (course.createdBy !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }


    await deleteCourse(req.params.id);


    res.json({
      message: "Course deleted successfully",
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};



module.exports = {
  addCourse,
  getAllCourses,
  getSingleCourse,
  editCourse,
  removeCourse,
};