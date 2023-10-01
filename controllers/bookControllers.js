const { getDatabase } = require("../data/dbConnection")
const ObjectId = require("mongodb").ObjectId;

// Books controllers
const getAllBooks = async (req, res) => {
  //#swagger.tags=["books"]
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
  //#swagger.tags=["books"]
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
  //#swagger.tags=["books"]
  const book = {
    "title": req.body.title,
    "authors": req.body.authors,
    "coverImg": req.body.coverImg,
    "description": req.body.description,
    "published": req.body.published,
    "publisher": req.body.publisher,
    "userid": req.body.userid
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
  //#swagger.tags=["books"]
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
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
      data: "Some error ocurred while updating the book."
    }) 
  }  
}

const deleteBookbyId = async (req, res) => {
  //#swagger.tags=["books"]
  const bookId = new ObjectId(req.params.id);
  try {
    const response = await (await getDatabase()).db().collection("books").deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
      res.status(202).json(`Book with id ${bookId} succesfully deleted!`)
    }    
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
      data: "Some error ocurred while deleting the book."
    })  
  }  
}

module.exports = {
  getAllBooks,
  getBookbyId,
  createNewBook,
  updateBookbyId,
  deleteBookbyId,
}