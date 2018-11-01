import axios from 'axios';


let getMovieUrl = `/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=天津&start=0&count=15&client=somemessage&udid=dddddddddddddddddddddd`

function getNews() {
    return axios.get(getMovieUrl)
        .then(res => {
            return res;
        }, err => {
            return err;
        })
}

export default getNews;