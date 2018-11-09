import React, { Component } from 'react';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import { Route } from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';
import Comments from './comments';
import './allComments.scss';
import {getComments} from '../../api/api';
function renderTabBar(props) {
    return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}

const tabs = [
    { title: <Badge>热门</Badge> },
    { title: <Badge>最新</Badge> },
];

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount(){
    }

    render() {
        return (
            <StickyContainer>
                <Tabs tabs={tabs} renderTabBar={renderTabBar}>
                    <div className='content'>
                    </div>
                    <div className='content'>
                        Content of second tab
                    </div>
                    
                </Tabs>
            </StickyContainer>
        )
    }
}