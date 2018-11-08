import React,{Component} from 'react';
import './review.scss';
export default class extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return (
            <div className='review'>
                <div className="review__title">
                    {this.props.reviewDetail.title}
                </div>
                <div className="review__author">{this.props.reviewDetail.author.name}</div>
                <div className='review__desc'>
                    {(this.props.reviewDetail.content).substr(0,100)}
                </div>
                <div  className='review__useful'>
                    {this.props.reviewDetail.useful_count}/{this.props.reviewDetail.useful_count+this.props.reviewDetail.useless_count} 有用
                </div>
            </div>
        )
    }
}