import {get} from './http.js'
// 热映接口
export const home = p => get("/movie/in_theaters/", p);
// 排行榜接口
export const rank = p => get("/movie/top250/", p);
// 商品接口
export const goods = p => get("http://www.liulongbin.top:3005/api/getgoods?pageindex=1", p);





