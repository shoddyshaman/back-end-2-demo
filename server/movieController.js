const movies = require('./db.json')
let idCounter = 11

module.exports = {
    getAllMovies:(req,res) => {
        res.status(200).send(movies)
    },
    createMovie:(req,res) => {
        const { title, rating, imageUrl} = req.body
        let newMovie = {
            id:idCounter,
            title:title,
            rating:rating,
            imageUrl:imageUrl
        }
        movies.push(newMovie)
        res.status(200).send(movies)
        idCounter++
    },
    deleteMovie:(req,res) => {
        let {id} = req.params
        let index = movies.findIndex(movie => +movie.id === +id)
        movies.splice(index,1)
        res.status(200).send(movies)
    },
    updateMovie:(req,res) => {
        let {id} = req.params
        let {type} = req.body
        let index = movies.findIndex(movie => +movie.id === +id)
        if(movies[index].rating === 5 && type === 'plus'){
            res.status(400).send('cannot go above 5')
        } else if (movies[index].rating === 0 && type === 'minus'){
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus'){
            movies[index].rating++
            res.status(200).send(movies)
        } else if(type === 'minus'){
            movies[index].rating--
            res.status(200).send(movies)
        } else {
            res.sendStatus(400)
        }

        
        // res.status(200).send(movies)
    }
}