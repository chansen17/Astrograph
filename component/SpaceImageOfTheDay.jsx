import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function SpaceImageOfTheDay() {
    
    const [photo, setPhoto] = useState('');

    const fetchImage = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.nasa.gov/planetary/apod?api_key=P130VmCns7WhlpyYMldkBQw4AjBJFkMdfNrFR4ss`)

            .then(({data}) => {
                
                setPhoto(data);
            })
            
            .catch(error => {
                console.log(`An error occured: ${error}`)
            });
    };

    useEffect(() => {
        fetchImage();
    }, [])

    return (
        <section className="photo-of-the-day-container container text-center" id="photoOfTheDay">
            <figure className="potd">
                <img className="animate__animated animate__zoomIn" src={photo.url} alt={photo.title} />
                <figcaption>
                    <h4>Nasa Photo of the Day</h4>
                    <h1>{photo.title}</h1>
                </figcaption>
            </figure>
            
        </section>
    )
}

ReactDOM.render(
    <SpaceImageOfTheDay/>,
    document.getElementById('rootImageDay')
);
