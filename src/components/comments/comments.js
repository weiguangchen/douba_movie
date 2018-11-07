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
                            <span>ifjweofijwef</span>
                            <span></span>
                        </div>
                        <div className="zan">2323</div>
                    </div>
                    <div className="comments__content">
                        要吸猫大大我打
                    </div>
                    <div className="comments__date">
                        1年前
                    </div>
                </div>
            </div>
        )
    }
}