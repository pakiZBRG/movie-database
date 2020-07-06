import React from 'react'
import RBCarousel from 'react-bootstrap-carousel'

export default function Carousel(){
    return (
        <div className='row'>
            <div className='col'>
                <RBCarousel
                    autoplay={true}
                    pauseOnVisibilty={true}
                    slideshowSpeed={5000}
                    version={4}
                    indicators={false}
                >
                    {movies}
                </RBCarousel>
            </div>
        </div>
    )
}