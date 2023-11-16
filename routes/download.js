import express from 'express'
import fs from 'fs'
import { getFolderFiles } from '../utils/file_utils.js'

var downloadRouter = express.Router()

downloadRouter.post('/download/getAllfiles', function (req, res) {
  try {
    console.log('request: ', req.data, req.params, req.body, req.query)
    const files = getFolderFiles(global.config.download_path)
    res.send({
      code: 200,
      data: files,
      message: 'success.'
    })
  } catch (err) {
    res.send({
      code: 500,
      message: 'server occur an error.' + err
    })
  }
})
downloadRouter.get('/download/downloadFile', function (req, res) {
  try {
    const filePath = global.config.download_path + '/' + req.query.relativePath
    if (fs.existsSync(filePath)) {
      res.download(filePath)
    } else {
      res.send({
        code: -1,
        message: `File does not exist. ${filePath}`
      })
    }
  } catch (err) {
    res.send({
      code: 500,
      message: 'server occur an error.' + err
    })
  }
})

export default downloadRouter