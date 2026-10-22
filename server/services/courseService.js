const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const getCourseCollection = () => {
  return getDB().collection("courses");
};

// Create Course
const createCourse = async (courseData) => {
  return await getCourseCollection().insertOne(courseData);
};

// Get All Courses
const getCoursesByUser = async (userId) => {
  return await getCourseCollection()
    .find({ createdBy: userId })
    .toArray();
};

// Get Single Course
const getCourseById = async (id) => {
  return await getCourseCollection().findOne({
    _id: new ObjectId(id),
  });
};

// Update Course
const updateCourse = async (id, data) => {
  return await getCourseCollection().updateOne(
    { _id: new ObjectId(id) },
    {
      $set: data,
    }
  );
};

// Delete Course
const deleteCourse = async (id) => {
  return await getCourseCollection().deleteOne({
    _id: new ObjectId(id),
  });
};

module.exports = {
  createCourse,
  getCoursesByUser,
  getCourseById,
  updateCourse,
  deleteCourse,
};