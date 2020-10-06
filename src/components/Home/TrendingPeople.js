import React, {useState, useEffect} from 'react'
import {fetchPersons} from '../../service/index'

export default function TrendingPeople(){
    const [persons, setPersons] = useState([])

    useEffect(() => {
        const fetchAPI = async () => setPersons(await fetchPersons())
        fetchAPI()
    })

    const trendingPersons = persons.slice(0, 12).map((person, i) => {
        const {name, popularity, profileImg} = person
        return (
            <div className='col-lg-2 col-md-3 col-sm-4' key={i}>
                <img className='img-fluid d-flex mx-auto' src={profileImg} alt={name}/>
                <h5 className='text-center my-2'>{name}</h5>
                <p className='text-center text-secondary mb-5'>
                    Number of views: <span className='font-weight-bold'>{popularity}</span>
                </p>
            </div>
        )
    });

    return(
        <React.Fragment>
            <div className='rom my-5'>
                <div className='col'>
                    <h2 className='text-center pt-4' style={{color: '#5a606b'}}>Trending people of the week</h2>
                </div>
            </div>
            <div className='row mt-3 container-b d-flex mx-auto'>
                {trendingPersons}
            </div>
        </React.Fragment>
    )
}