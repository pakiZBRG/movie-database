import React from 'react'

export default function AboutMe() {
    return (
        <div className='row mt-3'>
            <div className='col-lg-8 col-sm-6' style={{color: '#5a686b'}}>
                <h3>ABOUT ME</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tincidunt augue interdum velit euismod in pellentesque. Vulputate dignissim suspendisse in est ante</p>
                <p>Eleifend mi in nulla posuere sollicitudin. Ut aliquam purus sit amet. Elementum sagittis vitae et leo duis ut. Non enim praesent elementum facilisis leo vel. Enim eu turpis egestas pretium aenean. Nibh tortor id aliquet lectus proin nibh.</p>
                <ul className='list-inline'>
                    <li className='list-inline-item'>
                        <a href='/' style={{color: 'blue'}}>
                            <i className='fa fa-facebook'></i>
                        </a>
                    </li>
                    <li className='list-inline-item'>
                        <a href='/' style={{color: 'crimson'}}>
                            <i className='fa fa-youtube'></i>
                        </a>
                    </li>
                    <li className='list-inline-item'>
                        <a href='/' style={{color: 'purple'}}>
                            <i className='fa fa-instagram'></i>
                        </a>
                    </li>
                    <li className='list-inline-item'>
                        <a href='/' style={{color: 'lightblue'}}>
                            <i className='fa fa-twitter'></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className='col-lg-4 col-sm-6' style={{ color: '#5a606b' }}>
                <h3>KEEP IN TOUCH</h3>
                <ul className='list-unstyled'>
                    <li><p>
                        <i className='fa fa-map-marker-alt'></i> <strong>Address:</strong> Cara Dusana 23, Belgrade    
                    </p></li>
                    <li><p>
                        <i className='fa fa-phone'></i> <strong>Phone:</strong> +381 66 789 789 
                    </p></li>
                    <li><p>
                        <i className='fa fa-envelope'></i> <strong>Email:</strong> info@gmail.com   
                    </p></li>
                </ul>
            </div>
        </div>
    )
}