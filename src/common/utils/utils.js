// 将base64的图片转换成url
export function base64ImgtoUrl(dataurl, filename = "file") {
  let arr = dataurl.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split("/")[1];
  let bstr = window.atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const imgFile = new File([u8arr], `${filename}.${suffix}`, {
    type: mime,
  });
  const url = window.URL.createObjectURL(imgFile);
  return url;
}
//日期格式化 dateFormat("YYYY-mm-dd HH:MM", date)
export function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
// 获取上个月
export function getPreMonth(date, str = "-") {
  const arr = date.split(str);
  const year = arr[0]; //获取当前日期的年份
  const month = arr[1]; //获取当前日期的月份
  const day = arr[2]; //获取当前日期的日
  let year2 = year;
  let month2 = parseInt(month) - 1;
  if (month2 == 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  let day2 = day;
  const days2 = new Date(year2, month2, 0).getDate(); //获取上个月的天数
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = "0" + month2;
  }
  let t2 = year2 + str + month2 + str + day2;
  return t2;
}

// 下载Blob类型的excel
export function downloadExcel(obj, name) {
  const blob = new Blob([obj], {
    type: "application/vnd.ms-excel,charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  const today = new Date().toLocaleDateString().split("/").join("-");
  const fileName = name + "-" + today;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
