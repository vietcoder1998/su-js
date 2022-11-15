const fs = require('fs')
const path = require('path')
// regex

const matchVariable = /(\{\{)(.*?)(\}\})/
const matchCheckBox = /(\[)(.*?)(\])/

exports.TEMPLATES_FOLDER = path.resolve(__dirname, '../templates')

// creaet match regex
exports.replaceValueInContext = function (name, value, context) {
  const matchRegex = context.match(matchVariable)
  console.log(matchRegex)
}
// createElement
exports.createElement = function (type) {
  const ref = document.createElement(type)

  return ref
}

/**
 * create a string that export from an element with atomic and replace data with context
 *
 * @param   {Object}  data     data in context
 * @param   {String}  context  context default in atomic
 *
 * @return  {String}           [return description]
 */

exports.createContext = function (name, context) {
  return result
}

