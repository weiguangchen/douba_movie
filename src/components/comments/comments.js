import React,{Component} from 'react';
import './comments.scss';
export default class Comments extends Component{
    constructor(props){
        super(props)

        this.state = {}
    }

    render(){
        return (
            <div className='comments'>
                <div className="comments__avatar">
                    <img src={this.props.commentDetail.author.avatar} alt=""/>
                </div>
                <div className="comments__info">
                    <div className="comments__topic">
                        <div className='author'>
                            <span>{this.props.commentDetail.author.name}</span>
                            <span></span>
                        </div>
                        <div className="zan">{this.props.commentDetail.useful_count}</div>
                    </div>
                    <div className="comments__content">
                        {this.props.commentDetail.content}
                    </div>
                    <div className="comments__date">
                        {this.props.commentDetail.created_at}
                    </div>
                </div>
            </div>
        )
    }
}