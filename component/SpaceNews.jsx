import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


function SpaceNews() {
    const [state, setState] = useState({
        articles: []
    });

    const fetchNews = () => {

        axios.get(`https://gnews.io/api/v3/search?q=nasa&token=1965549aba8c046141a9b13cb755039f`)
            .then(({data}) => {

                let articlesArray = data.articles;

                setState(prevState => {
                    return {...prevState, articles: articlesArray}
                })
                console.log(data)
            })

    }
    

    const handleTopicChange = (topic) => {

          axios.get(`https://gnews.io/api/v3/search?q=${topic}&token=1965549aba8c046141a9b13cb755039f`)
            .then(({data}) => {

                let updatedArticles = data.articles;
                setState(prevState => {
                    return {...prevState, articles: updatedArticles}
                })
                
                console.log(data)
            })
    }

    useEffect(() => {
        fetchNews();
    }, [])

    return (
        <section className="space-news" id="spaceNews">

            <div className="container">
                <div className="jumbotron text-center">
                    <h1>Get your daily space news</h1>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={() => handleTopicChange('nasa')} type="button" className="btn btn-success">nasa</button>
                        <button onClick={() => handleTopicChange('spacex')} type="button" className="btn btn-outline-primary">spacex</button>
                        <button onClick={() => handleTopicChange('cosmos')} type="button" className="btn btn-outline-warning">cosmos</button>
                        <button onClick={() => handleTopicChange('science')} type="button" className="btn btn-outline-info">science</button>
                    </div>
                </div>

                <div className="row mb-2">
                    {
                        state.articles.map(article => {
                            return (
                                <div className="col-md-6" key={article.title}>
                                    <ul className="articles-list">
                                        <li>
                                            <img src={article.image} alt=""/>
                                            <h5>{article.title}</h5>
                                            <p>{article.description}</p>
                                            <a className="btn-sm btn-link" href={article.url}>Go to article</a>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            
        </section>
    )
}

ReactDOM.render(
    <SpaceNews/>,
    document.getElementById('rootNews')
);
