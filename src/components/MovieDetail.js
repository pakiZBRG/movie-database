import React, { useState, useEffect } from 'react'
import { fetchMovieDetail, fetchMovieVideos, fetchCasts, fetchRecommendation } from '../service'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css'
import { Modal } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import ReactStars from 'react-rating-stars-component'
import {Link} from 'react-router-dom'
import AboutMe from './AboutMe'

export default function MovieDetail({match}) {
    let params = match.params
    let genres = [];
    const [isOpen, setOpen] = useState(false);
    const [detail, setDetail] = useState([])
    const [video, setVideo] = useState([])
    const [casts, setCasts] = useState([])
    const [recommendation, setRecommendation] = useState([])

    useEffect(() => {
        const fetchAPI = async() => {
            setDetail(await fetchMovieDetail(params.id))
            setVideo(await fetchMovieVideos(params.id))
            setCasts(await fetchCasts(params.id))
            setRecommendation(await fetchRecommendation(params.id))
        }

        fetchAPI()
    }, [params.id])

    const {title, backdrop_path, vote_average, overview, release_date, runtime, revenue, budget, homepage} = detail
    genres = detail.genres
    const box_office = revenue - budget;

    //Open modal to play trailer 
    const MoviePlayerModal = (props) => {
        const youtubeUrl = 'http://www.youtube.com/watch?v=';
        return(
            <Modal
                {...props}
                size='xl'
                dialogClassName='height: 70vh'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id='contained-modal-title-vcenter'
                        style={{color: '#000', fontWeight: 'bold'}}
                    >
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background: '#000'}}>
                    <ReactPlayer
                        url={youtubeUrl + video.key}
                        playing
                        controls
                        width="100%"
                        height='70vh'
                    ></ReactPlayer>
                </Modal.Body>
            </Modal>
        )
    }

    //What genres applies for what movie
    let genresList;
    if (genres){
        genresList = genres.map((genre, i) => {
            return (
                <li className='list-inline-item' key={i}>
                    <button className='btn btn-outline-secondary'>
                        {genre.name}
                    </button>
                </li>
            )
        })
    }

    const castList = casts.slice(0, 4).map((cast, i) => {
        const {name, character, img} = cast
        return (
            <div className='col-lg-3 col-sm-6' key={i}>
                <img className='img-fluid d-flex mx-auto' src={img} alt={name}/>
                <p className='font-weight-bold text-center'>{name}</p>
                <p className='font-weight-light text-center text-secondary'>{character}</p>
            </div>
        )
    })

    const recommendationList = recommendation.slice(0, 4).map((movie, i) => {
        const {id, poster, title, popularity, rating} = movie
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

    return (
        <React.Fragment>
            <div className='container-a'>
                <div className='row mt-2'>
                    <MoviePlayerModal
                        show={isOpen}
                        onHide={() => {
                            setOpen(false)
                        }}
                    ></MoviePlayerModal>
                    <div className='col text-center'>
                        <img className='img-fluid' src={`http://image.tmdb.org/t/p/original/${backdrop_path}`} alt={title}/>
                        <div className='carousel-center'>
                            <i className='fa fa-play-circle' onClick={() => setOpen(true)} style={{fontSize: '2.5rem', cursor: 'pointer'}}></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-b mx-auto'>
                <div className='row mt-3'>
                    <div className='col'>
                    <h3>{title} <span className='release_date'>{release_date}</span></h3>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col'>
                        <p style={{color: '#5a606b', fontWeight: 'bold'}}>GENRE</p>
                    </div>
                </div>
                <div className='row mt-1'>
                    <div className='col'>
                        <ul className='list-inline'>
                            {genresList}
                        </ul>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col'>
                        <span style={{ color: '#5a606b', fontWeight: 'bold' }}>RATING: </span> 
                        <span className='rating'>{vote_average}</span>/10
                        <div className='text-center'>
                            <ReactStars 
                                count={10} 
                                value={vote_average} 
                                size={20} 
                                color1={'gray'} 
                                color2={'#f4c10f'} 
                                half={true} 
                                edit={false}
                            ></ReactStars>
                        </div>
                        <div className='mt-4'>
                            <p style={{ color: '#5a606b', fontWeight: 'bold'}}>RUN TIME: 
                                <span style={{ color: '#dcdcdc'}}> {runtime} min</span>
                            </p>
                        </div>
                        <div className='mt-4'>
                            <p style={{ color: '#5a606b', fontWeight: 'bold'}}>BUDGET: 
                                <span style={{ color: '#dcdcdc'}}> {box_office === 0 ? 'unknown' : `${box_office.toString()}$`}</span>
                            </p>
                        </div>
                        <div className='mt-4'>
                            <p style={{ color: '#5a606b', fontWeight: 'bold'}}>HOMEPAGE: 
                                <a href={homepage} target='blank' style={{color: 'lightblue'}}> {title}</a>
                            </p>
                        </div>
                        <div className='mt-4 text'>
                            <p style={{ color: '#5a606b', fontWeight: 'bold' }}>
                                OVERVIEW
                            </p>
                            <p>{overview}</p>
                        </div>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col'>
                        <p style={{color: '#5a606b', fontWeight: 'bold'}}>CASTS</p>
                    </div>
                </div>
                
                <div className='row mt-2'>{castList}</div>

                <div className='row mt-4'>
                    <div className='col'>
                        <p style={{color: '#5a606b', fontWeight: 'bold'}}>RECOMMENDATION</p>
                    </div>
                </div>

                <div className='row mt-2'>{recommendationList}</div>

                <hr className='mt-5' style={{borderTop: '1px solid #5a606b'}}></hr>
                <AboutMe/>
            </div>
        </React.Fragment>
    )
}
