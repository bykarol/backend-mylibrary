const router = require("express").Router()
const { 
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
} = require("../controllers")

router.get("/", (req,res)=>{res.status(500).send({
  status: "ok",
  message: "Home Page",
  data: "This is the home page"
}) })

// books collection routes
router.get("/books", getAllBooks)
router.get("/books/book/:id", getBookbyId)
router.post("/books/newbook", createNewBook)
router.put("/books/update/:id", updateBookbyId);
router.delete("/books/delete/:id", deleteBookbyId)

// users collection routes
router.get("/users", getAllUsers)
router.get("/users/user/:id", getUserbyId)
router.post("/users/newuser", createNewUser)
router.put("/users/update/:id", updateUserbyId);
router.delete("/users/delete/:id", deleteUserbyId)

module.exports = router