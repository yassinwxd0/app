const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//define the scsema
const mydata = new Schema({
    Name: String ,
    Age: String ,
    City: String ,
    Email: String ,
    Phone: String ,
    Post: String ,
    Start_Date: String ,
    Picture: String,
})

//create model based on the schema
const User = mongoose.model("User",mydata);


//export the model
module.exports = User;