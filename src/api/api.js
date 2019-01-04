import axios from 'axios';


let getMovieList = `/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=天津&client=somemessage&udid=dddddddddddddddddddddd`

/* 获取首页电影列表 */
function getMovie(start = 0, count = 8) {

    return axios.get(getMovieList, {
            params: {
                start,
                count
            }
        })
        .then(res => {
            return res;
        }, err => {
            return err;
        })
}

/* 获取电影详情 */
function getMovieDetail(id) {
    return axios.get(`/v2/movie/subject/${id}?apikey=0b2bdeda43b5688921839c8ecb20399b&city=天津&client=something&udid=dddddddddddddddddddddd`)
        .then(res => {
            return res;
        }, err => {
            return err;
        })
}

/* 获取短评 */
function getComments(id,start=0,count=20){
    return axios.get(`/v2/movie/subject/${id}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&client=something&udid=dddddddddddddddddddddd`,{
        params:{
            start,
            count
        }
       
    }).then(res=>{
        return res;
    },err=>{
        return err;
    })
}

function getReviews(id,start=0,count=20){
    return axios.get(`/v2/movie/subject/${id}/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&client=something&udid=dddddddddddddddddddddd`,{
        params:{
            start,
            count
        }
    }).then(res=>{
        return res;
    },err=>{
        return err;
    })
}

export {
    getMovie,
    getMovieDetail,
    getComments,
    getReviews
};