export function request (url, method, param, done) {
  // 将方法转换为大写
  method = method.toUpperCase()
  // 创建XMLHttpRequest对象，书写IE6的兼容
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
  // 将对象格式的参数转换为urlencoded格式
  var pairs = []
  for (var k in param) {
    pairs.push(k + "=" + param[k])
  }
  var str = pairs.join("&")
  // 判断方式是否为get
  if (method === "GET") {
    url += "?" + str
  }
  // 创建打开一个连接
  xhr.open(method, url, true)
  // 如果是Post方法，需要设置请求头，还有请求体
  var data = null
  if (method === "POST") {
    xhr.setRequestHeader("Content-Type", "application/json")
    data = JSON.stringify(param)
  }
  xhr.send(data)
  // 执行回调函数
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      // 执行外部传来的回调函数
      done(JSON.parse(this.responseText))
    }
  }
}