import React from 'react'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css'
import AboutMe from './Home/AboutMe'
import {Casts, MoviePlayer, MovieSpec, RecommendationList} from './MovieDetail/index'

export default function MovieDetail({match}) {
    let params = match.params

    return (
        <React.Fragment>
            <MoviePlayer params={params}/>
            <MovieSpec params={params} />
            <Casts params={params} />
            <RecommendationList params={params}/>
            <AboutMe/>
        </React.Fragment>
    )
}
