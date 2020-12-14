const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const contact = require('./db');
const utils = require('./utils');
const app = express()
app.set('view engine','ejs')
const port = 3000
var dburi = "mongodb+srv://test:test@cluster0.yoaws.mongodb.net/Contact-Form?retryWrites=true&w=majority";
mongoose.connect(dburi,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=> console.log("Connection Successful"))
.catch((error) => console.log("Error",error));
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => {
  res.render('contact');
})

app.post('/', urlencodedParser,(req, res) => {
  Name = req.body.txtName;
  Email = req.body.txtEmail;
  Message = req.body.txtMsg;
  if(Name==""|| Email=="" || Message==""){
    res.render("contact",{error:"Empty Fields"});
  }
  else if(!utils.regexCheck(Email)){
    
    res.render("contact",{error:"Email is not of valid form"});
  
  }
  else{
    const contactform = new contact({
      name:req.body.txtName,
      email:req.body.txtEmail,
      message:req.body.txtMsg
    });
    contactform.save();
    res.render('contact');
  }
    
  })
app.listen(port);