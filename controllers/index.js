const { getDatabase } = require("../data/dbConnection")
const ObjectId = require("mongodb").ObjectId;

// Books controllers
const getAllBooks = async (req, res) => {
  try {
    const result = await (await getDatabase()).db().collection('books').find();
    result.toArray().then((books) => {
      res.status(200).json(books);
    });      
  } catch (err) {
   res.status(500).send({
    status: "error",
    message: err.message,
    data: "Data not collected."
  })   
  }
}

const getBookbyId = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  try {
    const result = await (await getDatabase()).db().collection("books").find({ _id: bookId });
    result.toArray().then((books) => {
      res.setHeader("Content-Type", "application/json")
        .status(200).json(books[0]);
    });    
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
      data: "Data not collected."
    })   
  }
}

const createNewBook = async (req, res) => {
  const book = {
    "title": req.body.title,
    "authors": req.body.authors,
    "coverImg": req.body.coverImg,
    "description": req.body.description,
    "published": req.body.published,
    "publisher": req.body.publisher,
    "userid": req.body.userId
  }
  try {
    const response = await (await getDatabase()).db().collection("books").insertOne(book);
    if (response.acknowledged) {
      res.status(202).json(book) }
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
      data: "Some error ocurred while inserting the book."
    })    
  }
}

const updateBookbyId = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  const book = {
    "title": req.body.title,
    "authors": req.body.authors,
    "coverImg": req.body.coverImg,
    "description": req.body.description,
    "published":req.body.published,
    "publisher": req.body.publisher,
    "userid": req.body.userid
  }
  try {
    const response = await (await getDatabase()).db().collection("books").replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
      res.status(202).json(book)
    }     
  } catch (error) {
    res.status(500).json(response.error || "Some error ocurred while updating the book.");
  }  
}

const deleteBookbyId = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  const response = await (await getDatabase()).db().collection("books").deleteOne({ _id: bookId });
  if (response.deletedCount > 0) {
    res.status(202).json(`Book with id ${bookId} succesfully deleted!`)
  } else {
    res.status(500).json(response.error || "Some error ocurred while deleting the book.");
  }
}

// users controllers
const getAllUsers = async (req, res) => {
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
  const userId = new ObjectId(req.params.id);
  const response = await (await getDatabase()).db().collection("users").deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(202).json(`User with id ${userId} succesfully deleted!`)
  } else {
    res.status(500).json(response.error || "Some error ocurred while deleting the user.");
  }
}

module.exports = {
  getAllBooks,
  getAllUsers,
  getBookbyId,
  getUserbyId,
  createNewUser,
  createNewBook,
  updateBookbyId,
  updateUserbyId,
  deleteBookbyId,
  deleteUserbyId
}