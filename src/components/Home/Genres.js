import React, {useState, useEffect} from 'react'
import {fetchGenre, fetchMovieByGenre} from '../../service/index';
import {posterUrl, moviesUrl} from '../../service/config';
import MovieCard from './MovieCard'

export default function Genres() {
    const [genres, setGenres] = useState([])
    const [movieByGenre, setMovieByGenre] = useState([]);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchAPI = async() => {
            setGenres(await fetchGenre())
            const firstPage = `${moviesUrl}&page=1`;
            fetchMovies(firstPage);
        }

        fetchAPI()
    }, [])

    const fetchMovies = (path) => {
        fetch(path)
            .then(res => res.json())
            .then(res => {
                const modifiedData = res['results'].map(movie => ({
                    id: movie['id'],
                    backPoster: `${posterUrl}${movie['background_path']}`,
                    popularity: movie['popularity'],
                    title: movie['title'],
                    poster: `${posterUrl}${movie['poster_path']}`,
                    overview: movie['overview'],
                    rating: movie['vote_average'],
                }))
                
                setMovieByGenre(modifiedData)
                setCurrentPage(res.page);
            });
    }

    //Change movies by genre
    const handleGenre = async (genre_id) => setMovieByGenre(await fetchMovieByGenre(genre_id))

    const nextPage = () => {
        let nextPage = `${moviesUrl}&page=${CurrentPage+1}`
        fetchMovies(nextPage);
    }

    const prevPage = () => {
        let prevPage = `${moviesUrl}&page=${CurrentPage-1}`
        fetchMovies(prevPage);
    }

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

    //Display movies by genre
    const movieList = movieByGenre.map(item => <MovieCard movie={item} key={item.id}/>)

    return(
        <React.Fragment>
            <div className='row mt-4 container d-flex mx-auto'>
                <div className='col'>
                    <ul className='list-inline'>
                        {genreList}
                    </ul>
                </div>
            </div>
            <h2 className='text-center pt-4' style={{color: '#5a606b'}}>Trending Movies</h2>
            <div className='d-flex justify-content-center'>
                {CurrentPage !== 1 ?
                    <button 
                        onClick={prevPage}
                        className='next-btn'
                    >
                        <i className="fa fa-angle-double-left fa-lg"></i>
                    </button>
                : null}
                <span className='current-page'>{CurrentPage}</span>
                <button 
                    onClick={nextPage}
                    className='next-btn'
                >
                    <i className="fa fa-angle-double-right fa-lg"></i>
                </button>
            </div>
            <div className='row my-4 container-b d-flex mx-auto'>
                {movieList}
            </div>
        </React.Fragment>
    )
}