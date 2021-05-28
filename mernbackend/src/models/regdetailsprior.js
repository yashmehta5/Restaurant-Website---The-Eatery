const mongoose = require("mongoose");
const reservationSchemaTwo = new mongoose.Schema(
    {
        pDate: {type:Date, required:true},
        pTime: {type:String, required:true},
        pNumber: {type:Number, required:true, max: 10, min:1}
    }
)

const Register2 = new mongoose.model("ReservationDetailstwo",reservationSchemaTwo);
module.exports = Register2;