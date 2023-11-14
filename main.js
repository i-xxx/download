import config from './config/index.js'
global.config = config
import express from 'express'
const app = express()
import { getFolderFiles } from './utils/file_utils.js'

console.log('获取到文件列表: ', getFolderFiles('download_files'))

app.use('/download', express.static('download_files'))
app.use('/', express.static('static'))
import routes from './routes/index.js'
app.use('/api', ...routes)

app.listen(global.config.http_port, () => {
  console.log(`Example app listening on port ${global.config.http_port}`)
})