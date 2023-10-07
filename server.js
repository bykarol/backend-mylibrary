require("dotenv").config()
const PORT = process.env.PORT || 3000
const express = require("express")
const cors = require("cors")
const { initDb } = require("./data/dbConnection")
const router = require("./routes")
const passport = require("passport")
const session = require("express-session")
const GitHubStrategy = require("passport-github2").Strategy
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(express.json())

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}))
// express session initialization
.use(passport.initialize())
//init passport in every route
.use(passport.session())
// init passport to use "express-session"
.use((req, res, next)=>{
  res.setHeader("Access-Controll-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET", "POST", "PUT", "DELETE"
  )
  next()
})

app.use("/", router)
app.use(express.urlencoded({ extended: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
  return done(null, profile)
}))

passport.serializeUser((user, done)=>{
  done(null, user)
})
passport.deserializeUser((user, done)=>{
  done(null, user)
})

app.get("/", (req,res) => res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out"))
app.get("/github/callback", passport.authenticate("github", {
  failureRedirect: "/api/docs", session: false}),
    (req, res) => {
      req.session.user = req.user;
      res.redirect("/");    
  })


// connecting to the database
initDb((err) => {
  if (err) {
    console.log(err);
  }
  else {
    app.listen(PORT, () => console.log(`Database is listening and Web Server is running on port: ${PORT}`));
  }
})
