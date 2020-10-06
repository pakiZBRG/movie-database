import React, {useState, useEffect} from 'react'
import {fetchRecommendation} from '../../service/index'
import MovieCard from '../Home/MovieCard'

export default function RecommendationList({params}){
    const [recommendation, setRecommendation] = useState([])

    useEffect(() => {
        const fetchAPI = async() => setRecommendation(await fetchRecommendation(params.id))
        fetchAPI()
    }, [params.id])

    const recommendationList = recommendation.map(movie => <MovieCard movie={movie} key={movie.id}/>)
    return(
        <div className='container-b mx-auto'>
            <div className='row mt-4'>
                <div className='col text-center my-3'>
                    <h2 style={{color: '#5a606b', fontWeight: 'bold'}}>Recommendation</h2>
                </div>
            </div>
            <div className='row mt-2'>
                {recommendationList}
            </div>
            <hr className='mt-5' style={{borderTop: '1px solid #5a606b'}}></hr>
        </div>
    )
}