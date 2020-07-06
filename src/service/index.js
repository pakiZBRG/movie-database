import axios from 'axios'

const apiKey = "0932d0db0d84d50a4a8557d977a7c2c6"
const url = "https://api.themoviedb.org/3"
const nowPlayingUrl = `${url}/movie/now_playing`
const topRatedUrl = `${url}/movie/top_rated`
const movieUrl = `${url}/movie`
const genreUrl = `${url}/genre/movie/list`
const moviesUrl = `${url}/discover/movie`
const personUrl = `${url}/trending/person/week`

//Return trending movies
export const fetchMovies = async () => {
    try {
        const {data} = await axios.get(nowPlayingUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/'
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
        const {data} = await axios.get(genreUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })

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
        const {data} = await axios.get(moviesUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1,
                with_genres: genre_id
            }
        })

        console.log(data)

        const posterUrl = 'https://image.tmdb.org/t/p/original/'
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
        const {data} = await axios.get(personUrl, {
            params: {
                api_key: apiKey
            }
        })

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

//Return top rated movies
export const fetchTopRatedMovies = async () => {
    try{
        const {data} = await axios.get(topRatedUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })

        const posterUrl = 'https://image.tmdb.org/t/p/original/'
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

//Return movied details depending to movie id
export const fetchMovieDetail = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey, 
                language: 'en_US'
            }
        })

        console.log(data)
        
        return data
    } catch(err){
        console.log(err)
    }
}


//Return movie video - trailer
export const fetchMovieVideos = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/videos`, {
            params: {
                api_key: apiKey
            }
        })

        return data['results'][0]
    } catch(err){
        console.log(err)
    }
}

//Return casts for a movie
export const fetchCasts = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/credits`, {
            params: {
                api_key: apiKey
            }
        })

        const modifiedData = data['cast'].map(cast => ({
            id: cast['cast_id'],
            character: cast['character'],
            name: cast['name'],
            img: `https://image.tmdb.org/t/p/w200${cast['profile_path']}`
        }))

        return modifiedData
    } catch(err){
        console.log(err)
    }
}

export const fetchRecommendation = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/similar`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        })

        const posterUrl = 'https://image.tmdb.org/t/p/original/'
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
