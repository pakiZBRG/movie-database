import React, {useState, useEffect} from 'react'
import {fetchMovies} from '../../service/index'
import RBCarousel from 'react-bootstrap-carousel'
import {Link} from 'react-router-dom'

export default function Carousel(){
    const [nowPlaying, setNowPlaying] = useState([])

    useEffect(() => {
        const fetchAPI = async () => setNowPlaying(await fetchMovies())
        fetchAPI()
    }, [])

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

    return (
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
    )
}