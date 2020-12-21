import axios from "axios"

const URL = "http://fundoonotes.incubation.bridgelabz.com/api/"
export default {
    post(path,data){
        return axios({
            method:'post',
            url : `${URL}${path}`,
            data:data,
            headers:{
                'content-type':'application/json',
            }
        })
    }
    }