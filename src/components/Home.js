import React, { useState, useEffect } from 'react'
import { fetchMovies, fetchGenre, fetchMovieByGenre, fetchPersons, fetchTopRatedMovies } from '../service'
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css"
import {Link} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import AboutMe from './AboutMe'
import RBCarousel from 'react-bootstrap-carousel'

export default function Home() {
    const [nowPlaying, setNowPlaying] = useState([])
    const [genres, setGenres] = useState([])
    const [movieByGenre, setMovieByGenre] = useState([])
    const [persons, setPersons] = useState([])
    const [topRated, setTopRated] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies())
            setGenres(await fetchGenre())
            setMovieByGenre(await fetchMovieByGenre())
            setPersons(await fetchPersons())
            setTopRated(await fetchTopRatedMovies())
        }

        fetchAPI()
    }, [])

    //Display 7 trending movies in carousel
    const movies = nowPlaying.slice(0, 7).map((item, i) => {
        const { id, poster, title } = item
        return (
            <div key={i}>
                <div className='center'>
                    <Link to={`/movie/${id}`}>
                        <img style={{height: '100vh'}} src={poster} alt={title}/>
                    </Link>
                </div>
            </div>
        )
    })

    //Change movies by genre
    const handleGenre = async (genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id))
    }

    //Display all genres
    const genreList = genres.map((item, i) => {
        const {id, name} = item
        return(
            <li className='list-inline-item m-1' key={i}>
                <button className='btn btn-outline-secondary' onClick={() => {
                    handleGenre(id)
                }}>
                    {name}
                </button>
            </li>
        )
    })

    //Display 8 movies by genre
    const movieList = movieByGenre.slice(0, 8).map((item ,i) => {
        const {id, poster, title, popularity, rating} = item
        return (
            <div className='col-lg-3 col-md-6 mt-4' key={i}>
                <div>
                    <Link to={`/movie/${id}`}>
                        <img className='img-fluid' src={poster} alt={title}/>
                    </Link>
                </div>
                <div className='mt-2'>
                    <p style={{fontWeight:'bold', textAlign: 'center'}}>{title}</p>
                    <p style={{margin: '0', fontStyle: 'italic'}}>Popularity: <span className='popularity'>{popularity}</span></p>
                    <p style={{margin: '0', fontStyle: 'italic'}}>Rating: <span className='rating'>{rating}</span>/10</p>
                    <ReactStars 
                        count={10} 
                        value={rating} 
                        size={20} 
                        color1={'gray'} 
                        color2={'#f4c10f'} 
                        half={true} 
                        edit={false}
                    ></ReactStars>
                </div>
            </div>
        )
    })

    //Display 4 trending people
    const trendingPersons = persons.slice(0, 4).map((person, i) => {
        const {name, popularity, profileImg} = person
        return (
            <div className='col-md-3' key={i}>
                <img className='img-fluid d-flex mx-auto' src={profileImg} alt={name}/>
                <p className='font-weight-bold text-center'>{name}</p>
                <p className='font-weight-light text-center text-secondary'>
                    Number of views: <span className='font-weight-bold'>{popularity}</span>
                </p>
            </div>
        )
    });

    //Display 4 top rated movies
    const topRatedList = topRated.slice(0, 4).map((item, i) => {
        const {id, poster, title, rating} = item
        return(
            <div className='col-md-3' key={i}>
                <div>
                    <Link to={`/movie/${id}`}>
                        <img className='img-fluid' src={poster} alt={title}/>
                    </Link>
                    <p style={{fontWeight:'bold', textAlign: 'center'}}>{title}</p>
                    <p style={{margin: '0', fontStyle: 'italic'}}>Rating: <span className='rating'>{rating}</span>/10</p>
                    <ReactStars 
                        count={10} 
                        value={rating} 
                        size={20} 
                        color1={'gray'} 
                        color2={'#f4c10f'} 
                        half={true} 
                        edit={false}
                    ></ReactStars>
                </div>
            </div>
        )
    })
    

    return (
        <div className='container-a'>
            <div className='row'>
                <div className='col'>
                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibilty={true}
                        slideshowSpeed={5000}
                        version={4}
                        indicators={false}
                    >
                        {movies}
                    </RBCarousel>
                </div>
            </div>

            <div className='row mt-4 container d-flex mx-auto'>
                <div className='col'>
                    <ul className='list-inline'>
                        {genreList}
                    </ul>
                </div>
            </div>

            <div className='container-a row mt-3'>
                <div className='col'>
                    <div className='float-right'>
                        <i className='fa fa-arrow-alt-circle-right'></i>
                    </div>
                </div>
            </div>
            <div className='row mt-5 container-b d-flex mx-auto'>
                {movieList}
            </div>

            <div className='rom mt-5'>
                <div className='col'>
                    <p className='font-weight-bold text-center' style={{color: '#5a606b'}}>
                        TRENDING PEOPLE OF THE WEEK
                    </p>
                </div>
            </div>

            <div className='container-a row mt-3'>
                <div className='col'>
                    <div className='float-right'>
                        <i className='fa fa-arrow-alt-circle-right'></i>
                    </div>
                </div>
            </div>
            <div className='row mt-3 container-b d-flex mx-auto'>
                {trendingPersons}
            </div>

            <div className='row mt-3'>
                <div className='col'>
                    <p className='font-weight-bold text-center' style={{color: "#5a686b"}}>
                        TOP RATED MOVIES
                    </p>
                </div>
            </div>

            <div className='container-a row mt-3'>
                <div className='col'>
                    <div className='float-right'>
                        <i className='fa fa-arrow-alt-circle-right'></i>
                    </div>
                </div>
            </div>
            <div className='row mt-3 container-b d-flex mx-auto'>
                {topRatedList}
            </div>

            <hr className='container-b mt-5' style={{borderTop: '1px solid #5a606b'}}></hr>

            <div className='container-b mx-auto'>
                <AboutMe/>
            </div>
        </div>
    )
}
