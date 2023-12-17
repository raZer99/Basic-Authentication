const express=require("express")
const app=express()
const path=require("path")
const ejs=require("ejs")
const collection=require("./mongodb")

// const templatePath=path.join(__dirname,'../templates')
app.use(express.static("public"));
app.use(express.json())
app.set("view engine","ejs")
// app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=> {
    res.render("login")
})

app.get("/signup",(req,res)=> {
    res.render("signup")
})

app.post("/signup",async (req,res) => {
    const data={
        name:req.body.name,
        password:req.body.password
    }
    //giving data to mongodb
    await collection.insertMany([data])

    res.render("home")
})

app.post("/login",async (req,res) => {
    
    try{
        const check= await collection.findOne({name:req.body.name})
        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("Wrong password!")
        }
    }
    catch{
        res.send("Wrong details!")
    }

})

app.listen(3000,()=>{
    console.log('Listening on port 3000');
})