import React, {useState, useEffect} from 'react'
import { Modal } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import { fetchMovieDetail, fetchMovieVideos } from '../../service'

export default function MoviePlayer({params}){
    const [isOpen, setOpen] = useState(false);
    const [detail, setDetail] = useState([])
    const [video, setVideo] = useState([])

    useEffect(() => {
        const fetchAPI = async() => {
            setDetail(await fetchMovieDetail(params.id))
            setVideo(await fetchMovieVideos(params.id))
        }

        fetchAPI()
    }, [params.id])

    //Open modal to play trailer 
    const MoviePlayerModal = (props) => {
        return(
            <Modal
                {...props}
                size='xl'
                dialogClassName='height: 70vh'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id='contained-modal-title-vcenter'
                        style={{color: '#000', fontWeight: 'bold'}}
                    >
                        {detail.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background: '#000'}}>
                    {video ? <ReactPlayer
                        url={`http://www.youtube.com/watch?v=${video.key}`}
                        playing
                        controls
                        width="100%"
                        height='70vh'
                    ></ReactPlayer> : null}
                    
                </Modal.Body>
            </Modal>
        )
    }
    return(
        <div className='container-a'>
            <div className='row mt-2'>
                <MoviePlayerModal
                    show={isOpen}
                    onHide={() => {
                        setOpen(false)
                    }}
                ></MoviePlayerModal>
                <div className='col text-center'>
                    <img className='img-fluid' src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`} alt={detail.title}/>
                    <div className='carousel-center'>
                        <i className='fa fa-play-circle' onClick={() => setOpen(true)} style={{fontSize: '2.5rem', cursor: 'pointer'}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}