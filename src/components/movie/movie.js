import React, {
    Component
} from 'react';
import './movie.scss';
import { Link } from 'react-router-dom';

export default class Movie extends Component {

    formatCollect(count){
        let w = (parseInt(count)/10000).toFixed(1);
        console.log(w, count.toString().length )
        return count.toString().length>=5?w:count;
    }

    render() {
        const movie = this.props.movieDetail;

        const casts = movie.casts.map(m => {
            return m.name;
        }).join('/')

        return (
            <Link to={`/movieDetail/${movie.id}`} className='movie'>
                <div className="movie__image"><img src={movie.images.small} alt="" /></div>
                <div className="movie__info">
                    <div className="title">{movie.title}</div>
                    <div className="star"></div>
                    <div className="directors">导演：{movie.directors[0].name}</div>
                    <div className="casts">主演：{casts}</div>
                </div>
                <div className="movie__buy">
                    <div className="collect_count">{this.formatCollect(movie.collect_count)}万人看过</div>
                </div>
            </Link>

        )
    }



}