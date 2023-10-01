const router = require("express").Router()

const { 
  getAllBooks, 
  getBookbyId, 
  createNewBook,
  updateBookbyId,
  deleteBookbyId,
} = require("../controllers/bookControllers")

const { 
  getAllUsers, 
  getUserbyId,
  createNewUser,
  updateUserbyId,
  deleteUserbyId
} = require("../controllers/userControllers")

const { validateBooks, validateUsers, validateParams } = require("../validation/isValid")

router.use("/", require("./swagger"))

router.get("/", (req,res)=>{res.status(500).send({
  status: "ok",
  message: "Home Page",
  data: "This is the home page"
}) })

// books collection routes
router.get("/books", getAllBooks)
router.get("/books/book/:id", validateParams, getBookbyId)
router.post("/books/newbook", validateBooks, createNewBook)
router.put("/books/update/:id", validateParams, validateBooks, updateBookbyId);
router.delete("/books/delete/:id", validateParams, deleteBookbyId)

// users collection routes
router.get("/users", getAllUsers)
router.get("/users/user/:id", validateParams, getUserbyId)
router.post("/users/newuser", validateUsers, createNewUser)
router.put("/users/update/:id",validateUsers, validateParams, updateUserbyId);
router.delete("/users/delete/:id", validateParams, deleteUserbyId)

module.exports = router