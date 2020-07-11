import React, {useState, useEffect} from 'react'
import ReactStars from 'react-rating-stars-component'
import {fetchMovieDetail} from '../../service/index'

export default function MovieSpec({params}) {
    let genres = [];
    const [detail, setDetail] = useState([])

    useEffect(() => {
        const fetchAPI = async() => setDetail(await fetchMovieDetail(params.id))
        fetchAPI()
    }, [params.id])

    const {title, vote_average, overview, runtime, revenue, budget, homepage, release_date } = detail
    const box_office = revenue - budget;
    genres = detail.genres

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

    function numberWithDotts(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return(
        <div className='container-b mx-auto'>
            <div className='row mt-4'>
                <div className='col'>
                <div className='row mt-3'>
                        <h3>{title} <span className='release_date'>{release_date}</span></h3>
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
                            <span className='inlarge'> {runtime} min</span>
                        </p>
                    </div>
                    <div className='mt-4'>
                        <p style={{ color: '#5a606b', fontWeight: 'bold'}}>BUDGET: 
                            <span className='inlarge'> {box_office === 0 ? 'unknown' : `${numberWithDotts(box_office)}$`}</span>
                        </p>
                    </div>
                    <div className='mt-4'>
                        <p style={{ color: '#5a606b', fontWeight: 'bold'}}>HOMEPAGE: 
                            <a href={homepage} target='blank' style={{color: 'lightblue'}}>{title}</a>
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
        </div>
    )
}