import axios from "axios"

const baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/";
const headers= {
    'Content-Type': 'application/json',
    'Authorization':localStorage.getItem('access_token')
}
export default {
    post(url, data) {
        return axios({
            method: 'post',
            url: `${baseUrl}${url}`,
            data: data,
            headers
        })
    },
    get(url){
        return axios({
            method: 'get',
            url:`${baseUrl}${url}`,
            headers
        })
    }
  }
