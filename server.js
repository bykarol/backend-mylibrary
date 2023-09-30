require("dotenv").config()
const PORT = process.env.PORT || 3000
const express = require("express")
const cors = require("cors")
const { initDb } = require("./data/dbConnection")
const router = require("./routes")
const app = express()

app.use(express.json())
app.use(cors({
  origin: "*",
  methods: "GET, POST,PUT,DELETE"
}))

app.use(router)

// connecting to the database
initDb((err) => {
  if (err) {
    console.log(err);
  }
  else {
    app.listen(PORT, () => console.log(`Database is listening and Web Server is running on port: ${PORT}`));
  }
})
