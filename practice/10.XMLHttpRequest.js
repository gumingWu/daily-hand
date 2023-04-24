/**
 * 以下代码复制到浏览器控制台执行
 * 
 * 链接是我通过apifox启动的本地mock链接，也就返回一个对象
 * 
 * {"sex":"woman","age":72,"name":"分进传心效"}
 */

const request = new XMLHttpRequest()

request.open('GET', '	http://127.0.0.1:4523/m1/2638603-0-default/user')

function onloadend() {
  const response = request.responseText

  console.log(response);
}

if('onloadend' in request) {
  request.onloadend = onloadend
} else {
  request.onreadystatechange = () => {
    if (!request || request.readyState !== 4) {
      return;
    }
    // readystate handler is calling before onerror or ontimeout handlers,
    // so we should call onloadend on the next 'tick'
    setTimeout(onloadend);
  }
}

request.send()