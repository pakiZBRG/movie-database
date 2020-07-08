import React, {useState, useEffect} from 'react'
import {fetchCasts} from '../../service/index'

export default function Casts({params}){
    const [casts, setCasts] = useState([])

    useEffect(() => {
        const fetchAPI = async() => setCasts(await fetchCasts(params.id))
        fetchAPI()
    }, [params.id])

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

    return(
        <div className='container-b mx-auto'>
            <div className='row mt-4'>
                <div className='col'>
                    <p style={{color: '#5a606b', fontWeight: 'bold'}}>CASTS</p>
                </div>
            </div>
            <div className='row mt-2'>{castList}</div>
        </div>
    )
}