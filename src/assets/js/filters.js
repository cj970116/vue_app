let dateFormat = function(val) {
    let date = new Date(val);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      let d = date.getDate();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
}
export default{dateFormat}
