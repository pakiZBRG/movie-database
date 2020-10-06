import axios from 'axios'

const apiKey = "0932d0db0d84d50a4a8557d977a7c2c6"
const url = "https://api.themoviedb.org/3"
const posterUrl = 'https://image.tmdb.org/t/p/original/'
const nowPlayingUrl = `${url}/movie/now_playing?api_key=${apiKey}&langauge=en_US&page=1`
const movieUrl = `${url}/movie`
const genreUrl = `${url}/genre/movie/list?api_key=${apiKey}&langauge=en_US&page=1`
const moviesUrl = `${url}/discover/movie?api_key=${apiKey}&langauge=en_US&page=1`
const personUrl = `${url}/trending/person/week?api_key=${apiKey}`

//Return trending movies
export const fetchMovies = async () => {
    try {
        const {data} = await axios.get(nowPlayingUrl)
        const modifiedData = data['results'].map(d => ({
            id: d['id'],
            backPoster: `${posterUrl}${d['background_path']}`,
            popularity: d['popularity'],
            title: d['title'],
            poster: `${posterUrl}${d['poster_path']}`,
            overview: d['overview'],
            rating: d['vote_average'],
        }))

        return modifiedData
    } catch(err){
        console.log(err)
    }
}

//Return relevant movie genres
export const fetchGenre = async () => {
    try{
        const {data} = await axios.get(genreUrl)

        const modifiedData = data['genres'].map(g => ({
            id: g['id'],
            name: g['name']
        }))

        return modifiedData
    } catch(err){
        console.log(err)
    }
}

//Return movies when genre is selected by genre_id
export const fetchMovieByGenre = async (genre_id) => {
    try{
        const {data} = await axios.get(`${moviesUrl}`, {
            params: {
                with_genres: genre_id
            }
        })

        const modifiedData = data['results'].map(d => ({
            id: d['id'],
            backPoster: `${posterUrl}${d['background_path']}`,
            popularity: d['popularity'],
            title: d['title'],
            poster: `${posterUrl}${d['poster_path']}`,
            overview: d['overview'],
            rating: d['vote_average'],
        }))
        
        return modifiedData
    } catch(err){
        console.log(err)
    }
}

//Return relevant actors and directors
export const fetchPersons = async () => {
    try{
        const {data} = await axios.get(personUrl)

        const modifiedData = data['results'].map(p => ({
            id: p['id'],
            popularity: p['popularity'],
            name: p['name'],
            profileImg: `https://image.tmdb.org/t/p/w200${p['profile_path']}`,
            known: p['known_for_department']
        }))

        return modifiedData
    } catch(err){
        console.log(err)
    }
}

//Return movied details depending to movie id
export const fetchMovieDetail = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}?api_key=${apiKey}&language=en_US`)
        
        return data
    } catch(err){
        console.log(err)
    }
}


//Return movie video - trailer
export const fetchMovieVideos = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/videos?api_key=${apiKey}`)

        return data['results'][0]
    } catch(err){
        console.log(err)
    }
}

//Return casts for a movie
export const fetchCasts = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/credits?api_key=${apiKey}`)

        const modifiedData = data['cast'].map(cast => ({
            id: cast['cast_id'],
            character: cast['character'],
            name: cast['name'],
            img: `${posterUrl}${cast['profile_path']}`
        }))

        return modifiedData
    } catch(err){
        console.log(err)
    }
}

export const fetchRecommendation = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/similar?api_key=${apiKey}&langauge=en_US`)

        const modifiedData = data['results'].map(d => ({
            id: d['id'],
            backPoster: `${posterUrl}${d['background_path']}`,
            popularity: d['popularity'],
            title: d['title'],
            poster: `${posterUrl}${d['poster_path']}`,
            overview: d['overview'],
            rating: d['vote_average'],
        }))
        
        return modifiedData
    } catch(err){
        console.log(err)
    }
}