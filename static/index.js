import { request } from './utils.js'

// 获取服务器所有文件
request('/api/download/getAllFiles', 'post', { test: 1 }, function (res) {
  if (res.code === 200) {
    const content = document.getElementById('content')
    let innerText = ''
    res.data.forEach(element => {
      innerText += `<div class="content-line">${element.fileName}</div>`
    })
    content.innerHTML = innerText
  }
})

document.getElementById('downloadTest').onclick = function () {
  downloadFile('ideaIU-2023.2.exe', 'ideaIU-2023.2.exe')
}

function downloadFile (fileName, relativePath) {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.download = fileName
  a.href = '/api/download/downloadFile' + '?relativePath=' + relativePath
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const fileInput = document.querySelector("input[type=file]")
const output = document.querySelector(".output")

fileInput.addEventListener("change", () => {
  const [file] = fileInput.files
  console.log('files', fileInput.files)
  if (file) {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      output.innerText = reader.result
    })
    reader.readAsText(file)
  }
})