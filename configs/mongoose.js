const mongoose = require("mongoose");

//this will be DB name which will be seen in mongoDB(compass,robo3t etc)
const DB_NAME = "test";

//default port for mongodb is 27017
// const connectionURI = `mongodb://127.0.0.1:27017/${DB_NAME}`;
const connectionURI =  "mongodb+srv://abhishekkumaras007:5lcyvzMGoczs2drK@cluster0.3abx6oz.mongodb.net/?retryWrites=true&w=majority";

//connecting mongoose with the given uri,in this case it is localhost
mongoose.connect(connectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//tracking connection,if error we log error if connecion is successfull(open) we log its connected
const db = mongoose.connection;

db.on("error", () => console.error("error while connecting to mongoDB"));

db.once("open", () => {
  console.log("connected to mongoDB");
});

module.exports = db;











// const mongoose = require('mongoose');
// async function main(){
//     await mongoose.connect('mongodb+srv://abhishekkumaras007:5lcyvzMGoczs2drK@cluster0.3abx6oz.mongodb.net/?retryWrites=true&w=majority');
//     console.log("connection Successfull !! ");
// }
// main().catch(error =>console.log("connection not successfull !!"));
