import React, {useState, useEffect} from 'react'
import {fetchCasts} from '../../service/index'

export default function Casts({params}){
    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const fetchAPI = async() => setCasts(await fetchCasts(params.id));
        fetchAPI()
    }, [params.id])

    const castList = casts.map((cast, i) => {
        const {name, character, img} = cast
        return (
            <div className='col-lg-2 col-sm-4' key={i}>
                <img className='cast-img d-flex mx-auto' src={img} alt={name}/>
                <h5 className='text-center my-2'>{name}</h5>
                <p className='text-center text-secondary mb-4'>{character}</p>
            </div>
        )
    })

    return(
        <div className='container-b mx-auto'>
            <div className='row mt-4'>
                <div className='col'>
                    <h2 className='text-center mb-4' style={{color: '#5a606b'}}>Cast</h2>
                </div>
            </div>
            <div className='row mt-2'>{castList}</div>
        </div>
    )
}