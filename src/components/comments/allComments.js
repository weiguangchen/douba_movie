import React, { Component } from 'react';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import { Route } from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';
import Comment from './comments';
import './allComments.scss';
import { getComments } from '../../api/api';
import CommentsList from '../list/commentList';


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

        this.state = {
            id: ''
        }
    }
    componentWillMount() {
        let id = this.props.match.params.id;
        this.setState({
            id
        })
    }

    componentDidMount() {

    }

    getData(start = 0) {
        return getComments(this.state.id,start).then(res => {
            let dataSource = {};
            let dataBlobs = [];
            let rowIDs = [];
            res.data.comments.map(m => {
                dataBlobs[m.id] = m;
                rowIDs.push(m.id);
            })
            dataSource = {
                dataBlobs, rowIDs
            }
            return dataSource;
        }, err => err)
    }

    render() {
        return (
            <StickyContainer style={{height:'100%',background:'#ffffff'}}>
                <Tabs tabs={tabs} renderTabBar={renderTabBar}>
                    <div className='content'  >
                        <CommentsList getData={this.getData.bind(this)} />
                    </div>
                    <div className='content'>
                        Content of second tab
                    </div>

                </Tabs>
            </StickyContainer>
        )
    }
}