import React, {useState, useEffect} from 'react'
import {fetchPersons} from '../../service/index'

export default function TrendingPeople(){
    const [persons, setPersons] = useState([])

    useEffect(() => {
        const fetchAPI = async () => setPersons(await fetchPersons())
        fetchAPI()
    })

    const trendingPersons = persons.slice(0, 4).map((person, i) => {
        const {name, popularity, profileImg} = person
        return (
            <div className='col-md-3' key={i}>
                <img className='img-fluid d-flex mx-auto' src={profileImg} alt={name}/>
                <p className='font-weight-bold text-center'>{name}</p>
                <p className='font-weight-light text-center text-secondary'>
                    Number of views: <span className='font-weight-bold'>{popularity}</span>
                </p>
            </div>
        )
    });

    return(
        <React.Fragment>
            <div className='rom mt-5 mb-4'>
                <div className='col'>
                    <h3 className='text-center' style={{color: '#5a606b'}}>
                        TRENDING PEOPLE OF THE WEEK
                    </h3>
                </div>
            </div>
            <div className='row mt-3 container-b d-flex mx-auto'>
                {trendingPersons}
            </div>
        </React.Fragment>
    )
}