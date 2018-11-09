import listHoc from './hoc';
import Movie from '../movie/movie';
import { getMovie } from '../../api/api';

function getData(start = 0) {
    return getMovie(start).then(res => {
        let dataSource = {};
        let dataBlobs = [];
        let rowIDs = [];
        res.data.subjects.map(m => {
            dataBlobs[m.id] = m;
            rowIDs.push(m.id);
        })
        dataSource = {
            dataBlobs,rowIDs
        }

        return dataSource;
    },err => err)
}

const newList = listHoc(Movie, getData)
export default newList;
