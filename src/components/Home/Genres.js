import React, {useState, useEffect} from 'react'
import {fetchGenre, fetchMovieByGenre} from '../../service/index'
import MovieCard from './MovieCard'

export default function Genres() {
    const [genres, setGenres] = useState([])
    const [movieByGenre, setMovieByGenre] = useState([])

    useEffect(() => {
        const fetchAPI = async() => {
            setGenres(await fetchGenre())
            setMovieByGenre(await fetchMovieByGenre())
        }

        fetchAPI()
    }, [])

    //Change movies by genre
    const handleGenre = async (genre_id) => setMovieByGenre(await fetchMovieByGenre(genre_id))

    //Display all genres
    const genreList = genres.map((item, i) => {
        const {id, name} = item
        return(
            <li className='list-inline-item m-1' key={i}>
                <button className='btn btn-outline-secondary' onClick={() => {handleGenre(id)}}>
                    {name}
                </button>
            </li>
        )
    })

    //Display 8 movies by genre
    const movieList = movieByGenre.slice(0, 8).map(item => <MovieCard movie={item} key={item.id}/>)

    return(
        <React.Fragment>
            <div className='row mt-4 container d-flex mx-auto'>
                <div className='col'>
                    <ul className='list-inline'>
                        {genreList}
                    </ul>
                </div>
            </div>
            <div className='row mt-5 container-b d-flex mx-auto'>
                {movieList}
            </div>
        </React.Fragment>
    )
}