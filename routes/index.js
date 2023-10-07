const router = require("express").Router()
const passport = require("passport")

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

const { validateBooks, validateUsers, validateParams } = require("../middlewares/isValid")
const isAuth = require("../middlewares/isAuth")

// router.get("/", (req,res)=>{res.status(500).send({
//   status: "ok",
//   message: "Home Page",
//   data: "This is the home page"
// }) })

router.get("/login", passport.authenticate("github"), (req,res)=>{})
router.get("/logout", (req, res, next) => {
  req.logout(function(err){
    if (err) { 
      return next(err)
    }
    res.redirect("/")});
  })

// books collection routes
router.get("/books", getAllBooks)
router.get("/books/book/:id", validateParams, getBookbyId)
router.post("/books/newbook", isAuth, validateBooks, createNewBook)
router.put("/books/update/:id", isAuth, validateParams, validateBooks, updateBookbyId);
router.delete("/books/delete/:id", isAuth, validateParams, deleteBookbyId)

// users collection routes
router.get("/users", getAllUsers)
router.get("/users/user/:id", validateParams, getUserbyId)
router.post("/users/newuser", isAuth, validateUsers, createNewUser)
router.put("/users/update/:id", isAuth, validateUsers, validateParams, updateUserbyId);
router.delete("/users/delete/:id", isAuth, validateParams, deleteUserbyId)

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../swagger.json")

router.use("/api-docs", swaggerUi.serve)
router.get("/api-docs", swaggerUi.setup(swaggerDocument))


module.exports = router