require("dotenv").config()
const PORT = process.env.PORT || 3000
const express = require("express")
const cors = require("cors")
const { initDb } = require("./data/dbConnection")
const router = require("./routes")
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(express.json())

app.use("/", router)
app.use(express.urlencoded({ extended: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// connecting to the database
initDb((err) => {
  if (err) {
    console.log(err);
  }
  else {
    app.listen(PORT, () => console.log(`Database is listening and Web Server is running on port: ${PORT}`));
  }
})
