import React, {useState, useEffect} from 'react'
import {fetchRecommendation} from '../../service/index'
import MovieCard from '../Home/MovieCard'

export default function RecommendationList({params}){
    const [recommendation, setRecommendation] = useState([])

    useEffect(() => {
        const fetchAPI = async() => setRecommendation(await fetchRecommendation(params.id))
        fetchAPI()
    }, [params.id])

    const recommendationList = recommendation.slice(0, 4).map(movie => <MovieCard movie={movie} key={movie.id}/>)
    return(
        <div className='container-b mx-auto'>
            <div className='row mt-4'>
                <div className='col'>
                    <p style={{color: '#5a606b', fontWeight: 'bold'}}>RECOMMENDATION</p>
                </div>
            </div>
            <div className='row mt-2'>
                {recommendationList}
            </div>
            <hr className='mt-5' style={{borderTop: '1px solid #5a606b'}}></hr>
        </div>
    )
}