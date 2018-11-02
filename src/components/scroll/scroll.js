import React, { Component } from 'react';
import BScroll from 'better-scroll'
import './scroll.scss';
export default class scroll extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }
    render() {
        return (
            <div className="wrapper">
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }

    componentDidMount(){
        let wrapper = document.querySelector('.wrapper');
        let scroll = new BScroll(wrapper,{
            click:true,
            tap:true
        });
    }
}