const path = require('path')
const fs = require('fs')
const { createVariable } = require('./parse')

// parse context
function parseContext(context) {
  var strContext = context.toString()
  // input
  const replaceInput = {
    checkbox: `<input type='checkbox' />`,
    text: `<input type='text' />`,
  }
  const regex = {
    matchContent: /(\<\%)(.*?)(\-\%\>)/,
    matchCheckBox: /(\[)(.*?)(\])/,
    matchData: /(\{\{)(.*?)(\}\})/
  }
  let breakContext = strContext.split('\n')
  let variables = {}

  // pre handler
  const revertData = breakContext
    .map((breakItem) => {
      const regexInitVariable = breakItem.match(regex.matchContent)
      const regexDataParse = breakItem.match(regex.matchData)

      console.log(regexDataParse)

      // check regex variable
      if (regexInitVariable) {
        const { name, value } = createVariable(regexInitVariable[2])

        variables = { ...variables, [name]: value }
        return ''
      }

      // check if variable is already defined and render variable to template

      // replace [] to input
      let content = breakItem.replace('[]', replaceInput.checkbox)

      return content
    })
    .join('')

  return {
    content: revertData,
    variables,
  }
}

exports.convertFile = function (name) {
  // path
  this.rootdir = path.resolve(__dirname, '../templates')
  const pathFile = path.join(this.rootdir, [name, 'su'].join('.'))
  const resultFile = path.join(this.rootdir, [name, 'html'].join('.'))

  // read and write data
  fs.readFile(pathFile, 'utf8', function (err, data) {
    if (err) {
      console.error(err)
    } else {
      const context = data.toString()
      const newContext = parseContext(context).content

      fs.writeFile(resultFile, newContext, 'utf8', function (error) {
        if (error) {
          console.error(error)
        } else {
          console.log(resultFile)
        }
      })
    }
  })
}

this.convertFile('App')
