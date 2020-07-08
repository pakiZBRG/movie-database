import React, {useState} from 'react'
import axios from 'axios'
import ReactStars from 'react-rating-stars-component'
import {Link} from 'react-router-dom'

export default function MovieSearch(){
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState('')

    const SearchMovie = async(e) => {
        e.preventDefault()
        const apiKey = "0932d0db0d84d50a4a8557d977a7c2c6"
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&include_adult=false`

        try{
            const {data: {results}} = await axios.get(url)
            setMovies(results)
            console.log(results)
        } catch(err){
            console.log(err)
        }
    }

    return(
        <React.Fragment>
            <form onSubmit={SearchMovie} className='form'>
                <input name='query' placeholder='Enter the movie name' className='inputMovie' value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button type='submit' className='searchBtn'><i class="fa fa-search" aria-hidden="true"></i></button>
            </form>
            <div className='container-b mx-auto'>
                <div className='row mt-3'>
                    {movies.filter(movie => (movie.poster_path && movie.vote_average)).map(m => {
                        return (
                            <div className='col-lg-3 col-md-6 mt-4' key={m.id}>
                                <div>
                                    <Link to={`/movie/${m.id}`}>
                                        <img className='img-fluid' src={`https://image.tmdb.org/t/p/original/${m.poster_path}`} alt={m.title}/>
                                    </Link>
                                </div>
                                <div className='mt-2'>
                                    <p style={{fontWeight:'bold', textAlign: 'center'}}>{m.title}</p>
                                    <p style={{margin: '0', fontStyle: 'italic'}}>Popularity: <span className='popularity'>{m.popularity}</span></p>
                                    <p style={{margin: '0', fontStyle: 'italic'}}>Rating: <span className='rating'>{m.vote_average}</span>/10</p>
                                    <ReactStars 
                                        count={10} 
                                        value={m.vote_average} 
                                        size={20} 
                                        color1={'gray'} 
                                        color2={'#f4c10f'} 
                                        half={true} 
                                        edit={false}
                                    ></ReactStars>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}