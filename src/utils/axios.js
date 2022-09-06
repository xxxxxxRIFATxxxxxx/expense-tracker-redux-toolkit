import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://thawing-ocean-45235.herokuapp.com/",
});

export default axiosInstance;
