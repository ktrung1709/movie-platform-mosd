import axios from "axios";
import { base_url } from "../../utils/baseUrl";
// import { config } from "../../utils/axiosConfig";

const getMovies = async (movieData) => {
    const res = await axios.get(`${base_url}movie/find`, {
        params: movieData
    });
    if (res.data)
        return res.data
}

const getTopRatedMovies = async () => {
    const res = await axios.get(`${base_url}movie/getTopRate`, { params: { limit: 8 } });
    if (res.data)
        return res.data
}

const getLatestMovies = async () => {
    const res = await axios.get(`${base_url}movie/getLatest`);
    if (res.data)
        return res.data
}

const getMovieInfo = async (id) => {
    const res = await axios.get(`${base_url}movie/getInfo`, {
        params: id
    });
    if (res.data)
        return res.data
}

export const moviesService = {
    getMovies, getTopRatedMovies, getLatestMovies, getMovieInfo
};
