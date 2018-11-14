import listHoc from './hoc';
import Movie from '../movie/movie';
import { getMovie } from '../../api/api';


const newList = listHoc(Movie,{
    pageNum:8
})
export default newList;
