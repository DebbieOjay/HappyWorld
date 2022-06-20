const express = require("express");
const app = express();
const PORT = 5000;
const fs = require("fs");

const bodyParser = require("body-parser");

app.set("view engine", "ejs");
    
// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); 

app.get("/index", (req, res) => {
  // const name = "Deborah";

  res.render("index");
}); 
app.get("/about", (req, res) => {
  
  res.render("about"); 
});
app.get("/contact", (req, res) => {
  res.render("contact", { error: false, success: false, values: {} });
});

app.get("/team", (req, res) => {
  res.render("team");
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio");
});

app.get("/service", (req, res) => {
  res.render("service");
});
  
 
app.post("/contact", (req, res) => {
  // res.render("contact");
  console.log("The request posted to contact", req.body);
  // JSON
  // JSON.stringify()
  let result = JSON.stringify(req.body);
  let name = req.body.name;
  let date = new Date().toDateString();
  let path = "./contacts/" + name + "-" + date + ".txt";
 
  if (!req.body.name) {
    res.render("contact", {
      error: "Name is required",
      success: false,
      values: req.body,
    }); 
  } else if (!req.body.email) {
    res.render("contact", {
      error: "Email is required",
      success: false,
      values: req.body,
    });
  }
  fs.writeFile(path, result, (err) => {
    if (err) {
      console.log(err);
      res.render("contact", {
        error: "err:" + err,
        success: false,
        values: {},
      });
    } else {
      console.log("success");
      res.render("contact", {
        error: false,
        success: "Successfully Posted contact",
        values: {},
      });
    }
  });
  // fs.writeFile()
  // res.send("request sent");
});
app.post("/about", (req, res) => {
  console.log("The request posted to about", req.body);
});
 
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});   
 

//What is synchronization?
     //  This is ensuring that independent processes/threads begins to execute a designated block of code
     //at the same logical time.