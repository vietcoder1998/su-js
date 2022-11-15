const { HTML_ROOT_LINK, VDOM, Atomic } = require('./core')
const process = require('child_process')
const os = require('os')
const http = require('http')
const path = require('path')
const fs = require('fs')
var url = 'http://localhost:3000'

// check platform to start
var start = (function () {
  const platform = os.platform()
  switch (platform) {
    case 'darwin':
      return 'open'

    case 'win32':
      return 'open'

    default:
      return 'xdg-open'
  }
})()

// watch index.html for changes
fs.watchFile(HTML_ROOT_LINK, (curr, prev) => {
  console.log('Listen firle changes to', HTML_ROOT_LINK)
})

// open url
http
  .createServer(async (req, res) => {
    var stat = fs.statSync(HTML_ROOT_LINK)
    const atomic1 = new Atomic('App')

    atomic1.render();

    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': stat.size,
    })

    var readStream = fs.createReadStream(HTML_ROOT_LINK)
    readStream.pipe(res)
  })
  .listen(3000)