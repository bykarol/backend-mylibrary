require("dotenv").config()
const { MongoClient }= require("mongodb")

let database
const initDb = async (callback) => {
  const client = new MongoClient(process.env.MONGODB_URL)
  try {
  await client.connect()
  database = client
  callback(null, database)
  } catch (err) {
    callback(err)    
  }
}

const getDatabase = async ()=>{
  try {
    const data = await database
    return data    
  } catch (error) {
    throw new Error ("Database not initialized") 
  }
  }

module.exports = {
  initDb,
  getDatabase
}


