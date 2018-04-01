import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/products";
const PAGE_SIZE = 5;

export const fetchData = (page, sort) => {
    let fullUrl = API_BASE_URL + `?_page=${page}&_limit=${PAGE_SIZE}&_sort=${sort}`
    console.log(`Performing GET to ${fullUrl}`)

    return axios({
        method: "get",
        url: fullUrl
    }).then((response) => {
        return {response: response}
    }).catch((error) => (
        {error: error}
    ))
}
