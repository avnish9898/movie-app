const express = require("express")
const app = express()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const { JWT_KEY } = require("./secrets")
const cookieParser = require("cookie-parser")
const { login, signUp, getUser, updateUser } = require("./functions/userFunctions")
const { searchItem, catagories, catagoryGenre, moviesSeriesHome, catagoryItems, homeItems, addRating, addWatchList, Trend, getItemDetails, getWatchlist, deleteFromWatchList, getComments } = require("./functions/itemFunctions")
const data =
    app.use(express.static("/image"))
//
app.use(cors())
app.use(express.json())
app.use(cookieParser())
// app.use(express.static("public"))

app.get("/", homeItems)
app.get("/catagories", catagories)
app.get("/catagories/:id", catagoryGenre)
app.get("/catagory/:id", catagoryItems)
app.get("/trend/:id", Trend)
app.get("/type/:id", moviesSeriesHome)
app.get("/details/:id", getItemDetails)
app.post("/login", login)
app.post("/search/:id", searchItem)
app.post("/signup", signUp)
app.get("/watchlist/get/:id", getWatchlist)
app.patch("/watchlist/add", addWatchList)
app.patch("/watchlist/delete", deleteFromWatchList)

app.patch("/updateUser", updateUser)
app.post("/user", getUser)
app.post("/rating", addRating)
app.get("/comments/:id", getComments)
// app.post("/addCart", editCart)
app.listen("9000", () => {
    console.log("9000 server is runnign");
})



// module.exports = mainRouter




