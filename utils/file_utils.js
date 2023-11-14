import fs from 'fs'

export function getFolderFiles (path) {
  if (path[0] === '/') {
    path = path.substring(1)
  }
  const files = fs.readdirSync(path)
  let subFiles = []
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i]
    let stat = fs.statSync(path + '/' + fileName)
    if (stat.isDirectory()) {
      files.splice(i, 1)
      i--
      subFiles = getFolderFiles(path + '/' + fileName)
    } else {
      const tempPathArr = (path + '/' + fileName).split('/')
      let startIndex = 1
      if (tempPathArr[0] === '.' || tempPathArr[0].trim() === '') {
        startIndex = 2
      }
      files[i] = {
        fileName: fileName,
        relativePath: tempPathArr.splice(startIndex).join('/')
      }
    }
  }
  files.push(...subFiles)
  return files
}