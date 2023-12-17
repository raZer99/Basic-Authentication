const mongoose= require("mongoose")

mongoose.connect("mongodb://LocalHost:27017/LoginSignUp")
.then(()=> {
    console.log("mongodb connected");
})

.catch(()=> {
    console.log("Failed to connect");
})

const LogInSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

const collection = new mongoose.model("Collection1",LogInSchema)

module.exports=collection
