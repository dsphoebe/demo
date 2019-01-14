const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2] || 8000

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true)
  const path = request.url
  const query = ''


  console.log('HTTP 路径为 \n' + path)

  if (path == '/') {
    var string = fs.readFileSync('./index.html', 'utf8')
    var amount = fs.readFileSync('./db', 'utf8')
    string = string.replace('$$$amout$$$', amount)
    response.setHeader('Content-type', 'text/html; charset=utf-8')
    response.write(string)
    response.end()
  }
  if (path == '/pay') {
    var amount = fs.readFileSync('./db', 'utf8')
    var newAmount = amount - 1
    fs.writeFileSync('./db', newAmount)
    response.setHeader('content-Type', 'image/png')
    response.statusCode = 200
    response.write(fs.readFileSync('./p.png'))
    response.end()
  }
})

server.listen(port)

console.log('监听 ' + port)