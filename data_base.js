const { MongoClient } = require("mongodb")
let dbconectionUrl = "mongodb://127.0.0.1:27017"
let client = new MongoClient(dbconectionUrl);

let dbConection = async()=>{
    await client.connect();
    let db = client.db("Form");//mobgodb_database
    return db;


}
module.exports={dbConection}