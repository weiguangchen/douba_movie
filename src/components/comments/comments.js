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
                    <img src={this.props.data.author.avatar} alt=""/>
                </div>
                <div className="comments__info">
                    <div className="comments__topic">
                        <div className='author'>
                            <span>{this.props.data.author.name}</span>
                            <span></span>
                        </div>
                        <div className="zan">{this.props.data.useful_count}</div>
                    </div>
                    <div className="comments__content">
                        {this.props.data.content}
                    </div>
                    <div className="comments__date">
                        {this.props.data.created_at}
                    </div>
                </div>
            </div>
        )
    }
}