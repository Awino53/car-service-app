const express = require("express")

const app = express()

app.use(express.static ("public"))//serve static 

app.get("/", (req,res)=>{
    res.render("index.ejs")
})

app.get("/about", (req,res)=>{
    res.render("about.ejs")
})

app.get("/contact",(req,res)=>{
    res.render("contact.ejs")
})

app.get("/services",(req,res)=>{
    res.render("services.ejs")
})

app.get("/booknow",(req,res)=>{
    res.render("booknow.ejs")
})

//page not found
app.get("*",(req,res)=>{
    res.status(404) .render("404.ejs")
})

//start
app.listen(3000,()=> console.log("server running on port 3000"))