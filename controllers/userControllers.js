const { getDatabase } = require("../data/dbConnection")
const ObjectId = require("mongodb").ObjectId;

// users controllers
const getAllUsers = async (req, res) => {
  //#swagger.tags=["users"]
  try {
    const result = await (await getDatabase()).db().collection('users').find()
    result.toArray().then((users)=>{
      res.status(200).json(users);
    })    
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
      data: "Data not collected."
    })    
  }
}

const getUserbyId = async(req, res)=>{
  //#swagger.tags=["users"]
  const userId = new ObjectId(req.params.id);
  try {
    const result = await (await getDatabase()).db().collection("users").find({ _id: userId });
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json")
        .status(200).json(users[0]);
    });    
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
      data: "Data not collected."
    })   
  }
}

const createNewUser = async (req, res) => {
  //#swagger.tags=["users"]
  const user = {
  "name": req.body.name,
  "lastname": req.body.lastname,
  "email": req.body.email,
  "age": req.body.age
  }
  try {
    const response = await (await getDatabase()).db().collection("users").insertOne(user);
    if (response.acknowledged) {
      res.status(202).json(user) }
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
      data: "Some error ocurred while creating the user."
    })    
  }
}

const updateUserbyId = async (req, res) => {
  //#swagger.tags=["users"]
  const userId = new ObjectId(req.params.id);
  const user = {
    "name": req.body.name,
    "lastname": req.body.lastname,
    "email": req.body.email,
    "age": req.body.age
  }
  try {
    const response = await (await getDatabase()).db().collection("users").replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(202).json(user)
    }     
  } catch (error) {
   res.status(500).json(response.error || "Some error ocurred while updating the user.");
  }
}

const deleteUserbyId = async (req, res) => {
  //#swagger.tags=["users"]
  const userId = new ObjectId(req.params.id);
  try {
    const response = await (await getDatabase()).db().collection("users").deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(202).json(`User with id ${userId} succesfully deleted!`)}
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
      data: "Some error ocurred while deleting the user."
    }) 
  }  
}

module.exports = {
  getAllUsers,
  getUserbyId,
  createNewUser,
  updateUserbyId,
  deleteUserbyId
}