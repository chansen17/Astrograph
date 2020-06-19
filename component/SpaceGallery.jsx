import React, { useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import API_KEY from '../js/api';

const root_end_point = "https://images-api.nasa.gov/";

const Popup = ({selected, closePopup}) => {
    return (
        <div className="popup">
            <div className="content">
                <h3>{selected.title}</h3>      
                <img src={selected.src} />    

                <p className="card-text">{selected.description}</p>
                <p>{selected.photographer}</p>
                {/* <span className="badge badge-warning">{selected.keywords.map(keyword => keyword)}</span>   */}
                <button onClick={closePopup} className="btn btn-warning">Go back</button>
            </div>
        </div>
    )
};

function SpaceGallery() {

    const [state, setState] = useState({

        search: '',
        results: [],
        selected: {}

    });

    const handlePopup = id => {
        axios.get(`https://images-api.nasa.gov/search?q=${id}&media_type=image`)
        .then(({data}) => {
            console.log(data.collection.items);

            let selectedItem = {
                title: data.collection.items[0].data[0].title,
                src: data.collection.items[0].links[0].href,
                description: data.collection.items[0].data[0].description,
                photographer: data.collection.items[0].data[0].photographer,
                date: data.collection.items[0].data[0].date,
                keywords: data.collection.items[0].data[0].keywords
            }
            
            // let selectedItem = data.collection.items[0].links[0].href;
            setState(prevState => {
                return {...prevState, selected: selectedItem}
            });
            
        });
    }

    const closePopup = () => {
        setState(prevState => {
            return {...prevState, selected: {}}
        })
    }

    const handleInput = e => {

        let search = e.target.value;
        setState(prevState => {
            return {...prevState, search: search}
        });

        // test search input
        console.log(state.search);
    };
    
    const fetchData = e => {
        e.preventDefault();

      axios.get(`https://images-api.nasa.gov/search?q=${state.search}&media_type=image`)
        .then(({data}) => {

            let results = data.collection.items;
            setState(prevState => {
                return {...prevState, results: results}
            })
            console.log(data.collection.items);
        })
    };

    return (
        <section className="image-gallery container" id="spaceGallery">
            <form className="jumbotron" onSubmit={fetchData}>
                <div className="mb-3">
                    <h2>Gaze the cosmos</h2>
                    <input className="form-control" type="text" placeholder="Observe the cosmos" onChange={handleInput} />
                    <button className="btn btn-outline-primary" type="submit">Search</button>
                </div>
            </form>
            
            <div className="container">
                <div className="row">
                {
                    state.results.map(i => {
                        return (
                            <div className="col-sm-6 col-md-4 col-lg-3"key={i.data[0].nasa_id} >

                                <figure className="imghvr-blur">
                                    <img className="img-fluid" src={i.links[0].href} alt={i.data[0].title}/>
                                    <figcaption>
                                        <h5>{i.data[0].title}</h5>
                                        <button className="btn btn-sm btn-link" onClick={() => handlePopup(i.data[0].nasa_id)}>Learn more</button>
                                    </figcaption>
                                </figure>

                            </div>
                        )
                    })
                }
                </div>
            </div>

            { Object.keys(state.selected).length === 0 ?  <div/> : <Popup selected={state.selected} closePopup={closePopup}/>}

        </section>
    )
};

ReactDOM.render(
<SpaceGallery/>,
document.getElementById('rootGallery')
);