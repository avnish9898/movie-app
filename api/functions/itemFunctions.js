const userModel = require("../database/userModel")
const ratingModel = require("../database/ratingModel")
const { moreThanRating, lessThanRating } = require("./helperFn")
const data = require("../data")
function searchItem(req, res, next) {
    try {
        let { searchItem } = req.body
        let items = data.filter(obj => {
            return obj["Title"].toLowerCase().includes(searchItem.toLowerCase())
        })
        res.status(200).json({ data: items })
    } catch (err) {
        res.status(500).json({ data: null, message: err.message })
    }
}

function catagoryItems(req, res) {
    try {
        let { id } = req.params
        let item = data.filter(obj => {
            return obj.type == id
        })
        res.status(200).json({ data: item, message: "item is found" })
    } catch (err) {
        res.status(500).json({ data: null, message: err.message })
    }
}
function catagoryGenre(req, res) {
    try {
        let { id } = req.params
        let newData = data.filter(obj => {
            return obj['Genre'].toLowerCase().includes(id)
        })
        res.status(200).json({ data: newData })
    } catch (err) {

    }
}

function moviesSeriesHome(req, res) {
    let { id } = req.params;
    id = id.toLowerCase()
    let newData = { 'poster': [], 'latest': [], 'top-rated': [], 'popular': [] }
    for (let i = 0; i < data.length; i++) {
        if (data[i]['Type'] == id && newData['poster'].length < 4) {
            newData['poster'].push(data[i])
        }
        if (data[i]['Year'] > 2020 && data[i]['Type'] == id) {
            newData['latest'].push(data[i])
        }
        if (data[i]['imdbRating'] >= 7.5 && data[i]['Type'] == id) {
            newData['top-rated'].push(data[i])
        }
        if (data[i]['Metascore'] >= 75 && data[i]['Type'] == id) {
            newData['popular'].push(data[i])
        }
    }
    res.status(200).json({ data: newData })
}

function getItemDetails(req, res, next) {
    try {
        let { id } = req.params
        let item = data.find(obj => {
            return id == obj.id
        })
        if (item) {
            res.status(200).json({ data: item, message: "item is found" })
        } else {
            res.status(404).json({ data: null, message: "item not found" })
        }
    } catch (err) {
        res.status(500).json({ item: null, message: err.message })
    }
}


function homeItems(req, res) {
    let newData = {}
    newData["latest"] = moreThanRating(data, "Year", 2019)
    newData["topRated"] = moreThanRating(data, 'imdbRating', 8)
    newData['poster'] = []
    newData['poster'].push(newData['latest'][0], newData['topRated'][0])

    res.json({ data: newData })
}


function latestItems(req, res) {
    let newData = data.filter(obj => {
        return obj['Year'] >= 2019
    })
    res.json({ data: newData })
}
function catagories(req, res) {
    let newData = [{ name: 'Action', image: "https://staticg.sportskeeda.com/editor/2019/03/cedbb-15534102082658-800.jpg" }, { name: 'adventure', image: "https://m.media-amazon.com/images/M/MV5BNDE1MGRlNTQtZjc4ZC00MTI0LWEwY2MtODk1YTM2NmFmYTNmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" },
    { name: 'Fantasy', image: "https://fandomwire.com/wp-content/uploads/2019/11/Top-Ten-Fantasy-Thumb.jpg" },
    { name: 'Drama', image: "https://i.pinimg.com/736x/5b/21/38/5b2138635aa6c8a73c790e255a8cac2b--joan-allen-drama-series.jpg" },
    { name: 'Comedy', image: "https://cdn.europosters.eu/image/750/posters/friends-milkshake-i21739.jpg" },
    { name: "Thriller", image: "https://i.pinimg.com/736x/26/10/83/261083cd1496ba590f7ace2c39b3d420.jpg" },
    { name: "Horror", image: "https://www.femalefirst.co.uk/image-library/port/1000/p/poltergeist-feature-poster.jpg" },
    { name: "Romance", image: "https://i.pinimg.com/236x/cc/0e/0a/cc0e0a8601671c81c55ad9138c81ea62--the-notebook--watch-the-notebook.jpg" },
    { name: "Sci-fi", image: "https://m.media-amazon.com/images/M/MV5BMjI3Nzg0MTM5NF5BMl5BanBnXkFtZTgwOTE2MTgwNTM@._V1_.jpg" }]

    res.json({ data: newData })
}

function Trend(req, res) {
    let { id } = req.params;
    id = id.toLowerCase()
    let newData = {}
    let poster = "https://www.comingsoon.net/assets/uploads/2019/12/posters.jpg"
    if (id == 'latest') {
        newData = moreThanRating(data, 'Year', 2020);
    } else if (id == 'top-rated') {
        newData = moreThanRating(data, 'imdbRating', 7.5)
    }
    res.json({ data: newData, poster })
}

async function addWatchList(req, res) {
    const { id, watchlist } = req.body
    try {
        await userModel.findByIdAndUpdate(id, { list: { watchlist: watchlist } })
        let watchlistItems = await userModel.findById(id)
        res.status(200).json({ watchlist: watchlistItems.list })
    } catch (err) {
        res.status(500).json({ error: err.message })

    }

}
async function getWatchlist(req, res) {
    const { id } = req.params
    try {
        const list = await userModel.findById(id).select("list")
        res.status(200).json({ data: list })

    } catch (err) {
        res.status(500).json({ data: null })
    }

}
async function deleteFromWatchList(req, res) {
    const { id, watchlist } = req.body;
    try {
        await userModel.findByIdAndUpdate(id, { "list": { "watchlist": watchlist } })
        const newWatchList = await userModel.findById(id).select("list")
        res.status(200).json({ data: newWatchList })
    }
    catch (err) {
        console.log(err);
    }
}

async function addRating(req, res) {
    const { userId, movieId, comment, rating } = req.body;
    console.log('add rating body ', req.body);
    try {
        const userr = await ratingModel.findOne({ $and: [{ userId: userId }, { movieId: movieId }] })
        console.log("userr in addrating ", userr);
        if (userr == [] || userr == null) {
            const user = await userModel.findById(userId).select('name')
            console.log("user", user);


            const dataResp = await ratingModel.create({ userId: userId, name: user['name'], movieId: movieId, comment: comment, rating })
            console.log('movie like response', dataResp);
            res.json({ data: dataResp })
        } else {
            await ratingModel.findByIdAndUpdate(userr._id, { comment: comment, rating: rating }, { new: true })
            let dataa = await ratingModel.findOne({ $and: [{ userId: userId }, { movieId: movieId }] })
            console.log("dataa ", dataa);
            res.json({ data: dataa })
        }
    } catch (error) {
        console.log('error', error);
        res.json({ data: null, message: error.message })
    }
}
async function getComments(req, res) {
    const { id } = req.params
    try {
        let comments = await ratingModel.find({ movieId: id })
        console.log('comments ', comments);
        res.json({ data: comments })

    } catch (error) {
        res.status(404).json({ data: null })
    }
}
module.exports = { addRating, searchItem, getItemDetails, deleteFromWatchList, getWatchlist, catagoryItems, Trend, moviesSeriesHome, homeItems, addWatchList, latestItems, catagories, catagoryGenre, getComments }