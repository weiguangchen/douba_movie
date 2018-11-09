import React, { Component } from 'react';
import { ListView } from 'antd-mobile';
import { getMovie } from '../../api/api';
import Movie from '../movie/movie'

function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

let start = 0;
let dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];


export default function listHoc(WarpperComponent, ajaxData) {
    return class extends Component {

        constructor(props) {
            super(props);
            // const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];

            const dataSource = new ListView.DataSource({
                getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID][rowID],
                // getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                // sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            });

            this.state = {
                dataSource,
                isLoading: true,
            };
        }

        componentDidMount() {
            rowIDs = [];
            dataBlobs = {};
            start = 0;
            // you can scroll to the specified position
            // setTimeout(() => this.lv.scrollTo(0, 120), 800);

            // const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
            // simulate initial Ajax
            // console.log(this.state.dataSource)


            ajaxData().then(res=>{
                console.log('挂载成功！')
                console.log(res)
                Object.assign(dataBlobs,res.dataBlobs);
                rowIDs = rowIDs.concat(res.rowIDs);
                console.log(dataBlobs)
                console.log(rowIDs)
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(dataBlobs,rowIDs),
                    isLoading: false,
                });
    
            })



        }

        // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
        // componentWillReceiveProps(nextProps) {
        //   if (nextProps.dataSource !== this.props.dataSource) {
        //     this.setState({
        //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
        //     });
        //   }
        // }

        onEndReached = (event) => {
            // load new data
            // hasMore: from backend data, indicates whether it is the last page, here is false
            if (this.state.isLoading && !this.state.hasMore) {
                return;
            }
            // console.log('reach end', event);
            this.setState({ isLoading: true });


            ajaxData(start += 8).then(res=>{
                console.log('上拉加载')
                console.log(res)

                Object.assign(dataBlobs,res.dataBlobs);
                rowIDs = rowIDs.concat(res.rowIDs);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(dataBlobs,rowIDs),
                    isLoading: false,
                });
    
            })


        }

        render() {

            const row = (rowData, sectionID, rowID) => {
                return (
                    <WarpperComponent data={rowData} />
                )
            };

            return (
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    // renderHeader={() => <span>header</span>}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    // renderSectionHeader={sectionData => (
                    //   <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                    // )}
                    // renderBodyComponent={() => <MyBody />}
                    renderRow={row}
                    style={{
                        height: '100%',
                        overflow: 'auto',
                    }}
                    pageSize={4}
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
            );
        }

    }
}