
import axios from "./axios"

var Buffer = require('buffer/').Buffer
export const GET = (url, body) =>{
    return axios({
        method: 'get',
        url: url,
        headers: { 
            'Authorization': 'Basic '+ Buffer.from(localStorage.getItem('user') + ':' + localStorage.getItem('password')).toString('base64'), 
            'Content-Type': 'application/json'
          },
        params:{
            body
        }})
}

export const POST = (url, body) => {
    return axios({
        method: 'post',
        url: url,
        headers: { 
            'Authorization': 'Basic '+ Buffer.from(localStorage.getItem('user') + ':' + localStorage.getItem('password')).toString('base64'), 
            'Content-Type': 'application/json'
          },
        body: body
            }
        )
}
