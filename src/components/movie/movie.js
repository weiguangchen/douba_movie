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

            <div className='movie' onClick={()=>{
                console.log('123')
            }}>
                <div className="movie__image"><img src={movie.images.small} alt="" /></div>
                <div className="movie__info">
                    <div className="title">{movie.title}</div>
                    <div className="star"></div>
                    <div className="directors">导演：{movie.directors[0].name}</div>
                    <div className="casts">主演：{casts}</div>
                </div>
                <div className="movie__buy">
                    <div className="collect_count">{movie.collect_count}人看过</div>
                </div>
            </div>
        )
    }



}