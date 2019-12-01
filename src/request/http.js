import axios from 'axios'
import QS from 'qs'

axios.defaults.baseURL='https://douban.uieee.com/v2';

// 请求超时时间
axios.defaults.timeout=10000;
// post请求头

// get方法
export function get(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params})
            .then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err.data)
            })
})
}

export function post(url, params) { 
    return new Promise((resolve, reject) => {   
     axios.post(url, QS.stringify(params))  
     .then(res => {   
      resolve(res.data);  
     })  
     .catch(err => {   
      reject(err)  
     }) 
    });
   }