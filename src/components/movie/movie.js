import React, {
    Component
} from 'react';
import './movie.scss';

export default class Movie extends Component {


    render() {
        const movie = this.props.movieDetail;

        const casts = movie.casts.map(m=>{
            return m.name;
        }).join('/')

        return (

            <div className='movie'>
                <div className="movie__image"><img src={movie.images.small} alt="" /></div>
                <div className="movie__info">
                    <div className="title">{movie.title}</div>
                    <div className="star"></div>
                    <div className="directors">{movie.directors[0].name}</div>
                    <div className="casts">{casts}</div>
                </div>
                <div className="movie__buy">
                    <div className="collect_count">{movie.collect_count}</div>
                </div>
            </div>
        )
    }



}