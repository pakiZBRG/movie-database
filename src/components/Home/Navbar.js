import React from 'react'
import MovieSearch from './MovieSearch'
import {Link} from 'react-router-dom'

export default function NavBar() {
    return(
        <div className='container-fluid py-2 d-flex justify-content-center navbar'>
            <div className='row'>
                <div className='col-12 text-center'>
                    <h3 className='pt-1'>
                        <Link to={'/'}>Paki's Movie</Link>
                    </h3>
                </div>
                <div className='col-12 pt-1'>
                    <MovieSearch/>
                </div>
            </div>
        </div>
    )
}