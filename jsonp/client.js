const http = require('http')
const fs = require('fs')
const port = process.argv[2] || 8001
const domain = 'frank.com'

const server = http.createServer((request, response) => {
  const path = request.url

  console.log('http://' + domain + path)

  if (path == '/') {
    var string = fs.readFileSync('./index.html', 'utf8')
    var amount = fs.readFileSync('./db', 'utf8')
    string = string.replace('$$$amout$$$', amount)
    response.setHeader('Content-type', 'text/html; charset=utf-8')
    response.write(string)
    response.end()
  }
})

server.listen(port)

console.log('客户端 ' + domain + ' 监听 ' + port)