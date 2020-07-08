import React, {useState, useEffect} from 'react'
import {fetchTopRatedMovies} from '../../service/index'
import MovieCard from './MovieCard'

export default function TopRatedMovies(){
    const [topRated, setTopRated] = useState([])

    useEffect(() => {
        const fetchAPI = async () => setTopRated(await fetchTopRatedMovies())
        fetchAPI()
    }, [])

    const topRatedList = topRated.slice(0, 4).map(item => <MovieCard movie={item} key={item.id}/>)
    
    return(
        <React.Fragment>
            <div className='row mt-5'>
                <div className='col'>
                    <h3 className='text-center' style={{color: "#5a686b"}}>
                        TOP RATED MOVIES
                    </h3>
                </div>
            </div>
            <div className='row mt-3 container-b d-flex mx-auto'>
                {topRatedList}
            </div>
            <hr className='container-b mt-5' style={{borderTop: '1px solid #5a606b'}}></hr>
        </React.Fragment>
    )
}