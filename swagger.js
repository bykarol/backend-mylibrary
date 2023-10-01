const swaggerAutogen = require("swagger-autogen")()
require("dotenv").config()
const PORT = process.env.PORT || 3000

const doc = {
  info: {
    title: "Backend My Library",
    description: "App for book-lovers"
  },
  host: `localhost:${PORT}`,
  schemes: ["http"]
}

const outputFile = "./swagger.json"
const endpointsFiles = ["./routes/index.js"]

swaggerAutogen(outputFile, endpointsFiles, doc)
