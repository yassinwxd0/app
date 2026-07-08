const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//define the scsema
const mydata = new Schema({
    username: String
})

//create model based on the schema
const Alldata = mongoose.model("Alldata",mydata);


//export the model
module.exports = Alldata;