import React from 'react'
import MovieSearch from './MovieSearch'
import {Link} from 'react-router-dom'

export default function NavBar() {
    return(
        <div className='container-fluid py-2 d-flex justify-content-center navbar'>
            <div className='row'>
                <div className='col-lg-6 text-center'>
                <Link to={'/'}>
                    <h3 className='pt-1'>Paki's Movie</h3>
                </Link>
                </div>
                <div className='col-lg-6'>
                    <MovieSearch/>
                </div>
            </div>
        </div>
    )
}