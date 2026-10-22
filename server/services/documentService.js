const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");


const getDocumentCollection = () => {
    return getDB().collection("documents");
};


// Save Document
const createDocument = async (data) => {

    return await getDocumentCollection()
        .insertOne(data);

};


// Get Documents by Course
const getDocumentsByCourse = async (courseId) => {

    return await getDocumentCollection()
        .find({
            courseId: courseId
        })
        .toArray();

};

const getDocumentById = async (id) => {
  return await getDocumentCollection().findOne({
    _id: new ObjectId(id),
  });
};


module.exports = {
  createDocument,
  getDocumentsByCourse,
  getDocumentById,
};