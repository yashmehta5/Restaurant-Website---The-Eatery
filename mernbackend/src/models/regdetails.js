const mongoose = require("mongoose");
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/EateryRegistration";

// MongoClient.connect(url, function(err,db){
//     if (err) throw err;
//   var dbo = db.db("mydb");
//   var myobj = [
//       {
//     pFirstName: 'Yash',
//     pLastName: 'Gautam',
//     pPhoneNumber: '9205961663',
//     pFirstName: 'Yash',
//     pEmail: 'Yash'
//       }
//   ];
//   dbo.collection("ReservationDetailstwo").insertOne(myobj, function(err,res){
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   })
// })

const reservationSchema = new mongoose.Schema(
    {
        pFirstName: {type:String, required:true},
        pLastName: {type:String, required:true},
        pPhoneNumber: {type:String, required:true, maxlength: [10, "There can only 10 letters at max"]},
        pEmail: {type:String, required:true},
        pOccasion: {type:String, required:false},
        pSpecialRequest: {type:String, required:false}
    }
)
const Register1 =  new mongoose.model("ReservationDetail", reservationSchema);
module.exports = Register1;