const express = require("express");

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
  } else {
    res.render("signin.ejs");
  }
});
app.post("/register", (req, res) => {
  // actions -- input validation, save data in db(insert into clients/mechanics)
  res.redirect("/signin?message=registered");
});
// page not found
app.get("*", (req, res) => {
  res.status(404).render("404.ejs");
});
// start
app.listen(3000, (err) => console.log("Server running on port 3000"));