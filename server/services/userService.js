const { getDB } = require("../config/db");

const getUsersCollection = () => {
  const db = getDB();
  return db.collection("users");
};

const findUserByEmail = async (email) => {
  return await getUsersCollection().findOne({ email });
};

const createUser = async (userData) => {
  const result = await getUsersCollection().insertOne(userData);
  return result;
};

const findUserById = async (id) => {
  const { ObjectId } = require("mongodb");

  return await getUsersCollection().findOne({
    _id: new ObjectId(id),
  });
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
};