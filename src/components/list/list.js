/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { ListView } from 'antd-mobile';
import React from 'react';
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
let movieList = [];








class Demo extends React.Component {
  constructor(props) {
    super(props);
    // const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID][rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      // getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      // sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
      hasData:false
    };
  }

  componentDidMount() {
    rowIDs = [];
    dataBlobs = {};
    movieList = [];
    start = 0;
    console.log('组件挂载')
    console.log(this.state.dataSource)
    console.log(rowIDs)
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    // simulate initial Ajax
    // console.log(this.state.dataSource)
    getMovie().then(res => {
      let movie = res.data.subjects;
      movieList.concat(movie);

      movie.map(m => {
        dataBlobs[m.id] = m;
        rowIDs.push(m.id);
      })

      console.log(dataBlobs)
      console.log(rowIDs)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(dataBlobs, rowIDs),
        isLoading: false,
        // height: hei,
      });
      console.log(this.state.dataSource)

    })

    // setTimeout(() => {
    //   genData();
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
    //     isLoading: false,
    //     // height: hei,
    //   });
    //   console.log(this.state.dataSource)
    // }, 600);



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
    console.log('reach end', event);
    this.setState({ isLoading: true });
    // setTimeout(() => {
    //   genData(++pageIndex);
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
    //     isLoading: false,
    //   });
    // }, 1000);
    getMovie(start+=8).then(res => {
      let movie = res.data.subjects;
      movieList.concat(movie);

      movie.map(m => {
        dataBlobs[m.id] = m;
        rowIDs.push(m.id);
      })

      console.log(dataBlobs)
      console.log(rowIDs)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(dataBlobs, rowIDs),
        isLoading: false,
        // height: hei,
      });
      console.log(this.state.dataSource)

    })
  }

  render() {

    const row = (rowData, sectionID, rowID) => {

      return (
        <Movie movieDetail={rowData}/>
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

export default Demo;