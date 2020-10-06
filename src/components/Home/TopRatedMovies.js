import React, {useState, useEffect} from 'react'
import { topRatedUrl, posterUrl } from '../../service/config'
import MovieCard from './MovieCard'

export default function TopRatedMovies(){
    const [topRated, setTopRated] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const firstPage = `${topRatedUrl}&page=1`;
        fetchMovies(firstPage);
    }, []);

    const fetchMovies = (path) => {
        fetch(path)
            .then(res => res.json())
            .then(res => {
                const modifiedData = res.results.map(movie => ({
                    id: movie['id'],
                    backPoster: `${posterUrl}${movie['background_path']}`,
                    popularity: movie['popularity'],
                    title: movie['title'],
                    poster: `${posterUrl}${movie['poster_path']}`,
                    overview: movie['overview'],
                    rating: movie['vote_average'],
                }))
                
                setTopRated(modifiedData)
                setCurrentPage(res.page);
            });
    }

    const nextPage = () => {
        let nextPage = `${topRatedUrl}&page=${CurrentPage+1}`
        fetchMovies(nextPage);
    }

    const prevPage = () => {
        let prevPage = `${topRatedUrl}&page=${CurrentPage-1}`
        fetchMovies(prevPage);
    }

    const topRatedList = topRated.map(item => <MovieCard movie={item} key={item.id}/>)
    
    return(
        <React.Fragment>
            <div className='row mt-5'>
                <div className='col'>
                    <h2 className='text-center' style={{color: "#5a686b"}}>Top rated movies</h2>
                    <div className='d-flex justify-content-center'>
                        {CurrentPage !== 1 ?
                            <button 
                                onClick={prevPage}
                                className='next-btn'
                            >
                                <i className="fa fa-angle-double-left fa-lg"></i>
                            </button>
                        : null}
                        <span className='current-page'>{CurrentPage}</span>
                        <button 
                            onClick={nextPage}
                            className='next-btn'
                        >
                            <i className="fa fa-angle-double-right fa-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className='row mt-3 container-b d-flex mx-auto'>
                {topRatedList}
            </div>
            <hr className='container-b mt-5' style={{borderTop: '1px solid #5a606b'}}></hr>
        </React.Fragment>
    )
}