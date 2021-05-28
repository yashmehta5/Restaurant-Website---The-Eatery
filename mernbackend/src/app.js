const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register1 = require("./models/regdetails");
const Register2 = require("./models/regdetailsprior");
const SignIn1 = require("./models/signInDetails");
const NewsLetter1 = require("./models/newsletter");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public"); 
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path)); 
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path); 


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.use(express.urlencoded({extended:false}));

app.post("/", async (req, res) =>{
    try{
        const signInRecord = new SignIn1({
            pSignEmail: req.body.pSignEmail,
            pSignPassword: req.body.pSignPassword
        })
        const regStatusThree = await signInRecord.save();
    }catch(e){
        res.status(400);
        res.send(e);
    }
})

app.post("/", async (req, res) => {
    try{
        const newsSubscriptionRecord = new NewsLetter1({
            pnewsletterEmail: req.body.pnewsletterEmail
        })
        const subscribeStatus = await newsSubscriptionRecord.save();
    }catch(e){
        res.status(400);
        res.send(e);
    }
})

app.post("/index", async (req, res) =>{
    try{       
        console.log("date is:", req.body.pDate);

        const reservationRecordtwo = new Register2({
            pDate: req.body.pDate,
            pTime: req.body.pTime,
            pNumber: req.body.pNumber
        })
        const regStatusTwo = await reservationRecordtwo.save();
    }catch(e){
        res.status(400);
        res.send(e);
    }
})

app.post("/register", async (req, res) => {

    try{
        const reservationRecord =  new Register1({
            pFirstName : req.body.pFirstName,
            pLastName : req.body.pLastName,
            pPhoneNumber : req.body.pPhoneNumber,
            pEmail : req.body.pEmail,
            pOccasion : req.body.pOccasion,
            pSpecialRequest : req.body.pSpecialRequest
        })
        
        const regStatus = await reservationRecord.save();
        res.render("index");
    }
    catch(e){
        res.status(400);
        res.send(e);
    }
})

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});

