const express = require("express");
const mysql = require("mysql");


const dbconn = mysql.createConnection({
  host: 'localhost',
  database: 'carservice',
  user: 'root',
  password: '',
})

const app = express();
app.use(express.static("public")); // serve static files -- redirect requests fro .css, img, .js files to a folder public

app.get("/", (req, res) => {
  //home route
  res.render("index.ejs");
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
app.get("/services", (req, res) => {
  res.render("services.ejs");
});
app.get("/booknow", (req, res) => {
  res.render("booknow.ejs");
});
app.get("/signin", (req, res) => {
  console.log(req.query);
  if (req.query.message) {
    res.render("signin.ejs", { message: "Registration succesful!! Sign in" });
  }else if(req.query.error){
    res.render("signin.ejs",{error:"registration failed !! select role"})

  } else {
    res.render("signin.ejs");
  }
});
app.post("/register",express.urlencoded({extended: true}), (req, res) => {
  // actions -- input validation, save data in db(insert into clients/mechanics)
  console.log("request body");
  console.log(req.body);
  // req.body contains the parsed request body
  const {id,fullname,password,email,phone,role,specialty,address} = req.body
  
  let sql = ""
  if(req.body.role === "mechanic"){
    sql = `INSERT INTO mechanics(id_number, full_name,phone,specialty,email,password) VALUES(${id},"${fullname}","${phone}","${specialty}","${email}","${password}")`;
  }else if(role == "client"){
    sql = `INSERT INTO clients(id_number, full_name,phone,address,email,password) VALUES(${id},"${fullname}","${phone}","${address}","${email}","${password}")`;
  }else{
    return res.redirect("/signin?error=role")
  }
  dbconn.query(sql,(error)=>{
    if(error){
      console.log(error);
      
      res.render('500.ejs');
      }else{
        res.redirect("/signin?message=Registered");
    }
  })
});
// page not found
app.get("*", (req, res) => {
  res.status(404).render("404.ejs");
});
// start
app.listen(3000, (err) => console.log("Server running on port 3000"));