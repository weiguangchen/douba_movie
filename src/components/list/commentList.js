import listHoc from './hoc';
import Comment from '../comments/comments';
import { getComments } from '../../api/api';

function getData(start = 0) {
    return getComments(start).then(res => {
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

export default listHoc(Comment, getData);
