const mongoose = require("mongoose")
const { db_link } = require("../secrets")
const bcrypt = require("bcrypt")
const { isEmail } = require("validator")
mongoose.connect(db_link).then(db => {
    console.log("connected");
}).catch(err => {
    console.log(err);
})

//schem
const ratingSchema = new mongoose.Schema({

    userId: { type: String },
    movieId: { type: String },
    rating: { type: Number },
    name: { type: String },
    comment: { type: String }

}, { timestamps: true })

//save password in hashed form



let ratingModel = mongoose.model("movieRating", ratingSchema)
module.exports = ratingModel
