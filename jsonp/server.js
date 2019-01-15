const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2] || 8002
const domain = 'jack.com'

const server = http.createServer((request, response) => {
  const path = request.url
  const url_parts = url.parse(path, true)
  const query = url_parts.query

  console.log(query, query.callback)
  console.log('http://' + domain + path)
if (url_parts.pathname == '/pay') {
    var amount = fs.readFileSync('./db', 'utf8')
    var newAmount = amount - 1
    fs.writeFileSync('./db', newAmount)
    response.setHeader('content-Type', 'application/javascript')
    response.statusCode = 200
    response.write(`
      ${query.callback}.call(undefined, {
        "result": "success",
        "left": ${newAmount}
      });
    `)
    response.end()
  }
})

server.listen(port)

console.log('服务端 ' + domain + ' 监听 ' + port)