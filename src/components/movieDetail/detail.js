import React, { Component } from 'react';
import './detail.scss';
import { getMovieDetail,getComments,getReviews } from '../../api/api';
import { ActivityIndicator } from 'antd-mobile';
import Comment from '../comments/comments';
import Review from '../reviews/review';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
import classNames from 'classnames';
function Thumb(props) {
    return (
        <div className='swiper-slide'>
            <img src={props.thumb.avatars.small} alt="" className='swiper-img' />
        </div>
    )
}

function Yg(props){
    return (
        <div className='swiper-slide' style={{backgroundImage:'url('+props.thumb.image+')',backgroundSize:'cover'}}>
            {/* <img src={props.thumb.image} alt="" className='swiper-img' /> */}
        </div>
    )
}

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieDetail: {},
            comments:[],
            reviews:[],
            hasData: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        getMovieDetail(id).then(res => {
            console.log(res)
            this.setState({
                movieDetail: res.data,
                hasData: true
            })
            new Swiper(this.swiper1, {
                slidesPerView: 4.5,
                spaceBetween: 6
            })
            new Swiper(this.swiper2, {
                slidesPerView: 1.5,
                spaceBetween: 6
            })
        })

        getComments(id,0,5).then(res=>{
            this.setState({
                comments:res.data
            })
        })

        getReviews(id,0,5).then(res=>{
            console.log(res)
            this.setState({
                reviews:res.data
            })
        })


    }

    formatTags() {
        const movieDetail = this.state.movieDetail;
        let tags;
        if (movieDetail.genres.length > 1) {
            tags = movieDetail.genres.join('/')
        } else if (movieDetail.genres.length == 1) {
            tags = movieDetail.genres[0]
        } else {
            tags = ''
        }
        return tags ? `${movieDetail.year}/${tags}` : `${movieDetail.year}`;
    }


    render() {
        const _this = this;
        const movieDetail = this.state.movieDetail;
        const comments = this.state.comments;
        const reviews = this.state.reviews;

        let commentClass = classNames({
            'movie__comments':true,
            'loading':!_this.state.comments.comments
        })

        return this.state.hasData ? (
            <div className='movie__detail'>
                <div className='movie__img'>
                    <img src={movieDetail.images.large} alt="" />
                </div>
                <div className="movie__info">
                    <div className="movie__desc">
                        <div className="left">
                            <div className="title">{movieDetail.title}</div>
                            <div className="desc">
                                <div className="">{this.formatTags()}</div>
                                <div>原名：{movieDetail.original_title}</div>
                                <div className="">上映时间：{movieDetail.mainland_pubdate}</div>
                                <div>片长：{movieDetail.durations[0]}</div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="pj">
                                <div className='point'>豆瓣评分</div>
                                <em>{movieDetail.rating.average}</em>
                                {/* <div>4星</div> */}
                                <div className='count'>{movieDetail.ratings_count}人</div>
                            </div>
                        </div>
                    </div>
                    <div className="movie__intr">
                        <div className="sub_title">剧情介绍</div>
                        <div className='content'>
                            {movieDetail.summary}
                        </div>
                    </div>
                    <div className="movie__cases">
                        <div className="sub_title">影人</div>
                        <div className="swiper-container" ref={(el) => {
                            this.swiper1 = el;
                        }}>
                            <div className="swiper-wrapper">
                                {movieDetail.directors.map(m => {
                                    return <Thumb thumb={m} key={m.id} />
                                })}
                                {movieDetail.casts.map(m => {
                                    return <Thumb thumb={m} key={m.id} />
                                })}
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                    <div className="movie__yg">
                        <div className="sub_title">预告片/剧照</div>
                        <div className="swiper-container" ref={(el) => {
                            this.swiper2 = el;
                        }}>
                            <div className="swiper-wrapper">
                                {movieDetail.photos.map(m => {
                                    return <Yg thumb={m} key={m.id} />
                                })}
                                <div className='swiper-slide'>
                                    全部剧照
                                </div>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                    
                    <div className={commentClass} >
                        <div className='subtit'>短评</div>
                        {
                            comments.comments?comments.comments.map(m=>{
                                return <Comment commentDetail={m} key={m.id}/>
                            }):<ActivityIndicator text='获取短评中' />
                        }
                    </div>
                    <div className={commentClass} >
                        <div className='subtit'>影评</div>
                        {
                            reviews.reviews?reviews.reviews.map(m=>{
                                return <Review reviewDetail={m} key={m.id}/>
                            }):<ActivityIndicator text='获取影评中' />
                        }
                    </div>
                </div>

            </div>
        ) : <div className='loading'>
                <ActivityIndicator size='large' text='加载中' />
            </div>
    }

}