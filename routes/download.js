import express from 'express'
import { getFolderFiles } from '../utils/file_utils.js'

var downloadRouter = express.Router()

downloadRouter.post('/download/getAllfiles', function (req, res) {
  try {
    const files = getFolderFiles('./download_files')
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

export default downloadRouter
