const mongoose = require("mongoose");
const newsSchema = new mongoose.Schema(
    {
        pnewsletterEmail: {type:String, required:false}
    }
)

const NewsLetter1 = new mongoose.model("Newsletter Subscriptions", newsSchema);
module.exports = NewsLetter1;