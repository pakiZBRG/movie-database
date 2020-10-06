import React from 'react'
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css"
import {AboutMe, Carousel, Genres, MovieSearch, TrendingPeople, TopRatedMovies} from './Home/index'

export default function Home() {
    return (
        <div className='container-a'>
            <Carousel/>
            <Genres />
            <MovieSearch />
            <TrendingPeople />
            <TopRatedMovies />
            <AboutMe/>
        </div>
    )
}
