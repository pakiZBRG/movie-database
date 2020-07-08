import React from 'react'
import ReactStars from 'react-rating-stars-component'
import {Link} from 'react-router-dom'

export default function MovieCard({movie}) {
    const {id, poster, title, popularity, rating} = movie
    
    return(
        <div className='col-lg-3 col-md-6 mt-4'>
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
}