const fs = require('fs')
const path = require('path')
const { createContext, initProperties, TEMPLATES_FOLDER } = require('./lib')

exports.HTML_ROOT_LINK = path.resolve(__dirname, '../public', 'index.html')
exports.HTML_CSS_LINK = path.resolve(__dirname, '../public', 'index.css')
exports.HTML_JS_LINK = path.resolve(__dirname, '../public', 'index.js')

exports.Atomic = class Atomic {
  name = 'App'
  context = ''
  $actions = {}
  $methods = {}
  $attrs = {}
  children = []
  
  constructor(name, context){
    this.name = name
    this.context = context
    this.properties = this.initProperties(this.name, this.context)
    this.init()
  }
  init = function () {}
  addChild = function (child) {
    this.children.push(child)
  }
  info = function () {
    console.log(this)
  }

  initProperties = function (name, context) { 
    const file  = path.join(TEMPLATES_FOLDER, [name, 'su'].join('.'))
    const content = fs.readFileSync(file, 'utf8').toString()
    const values = JSON.parse(context)
    this.properties.bind(...values)

    console.log(content, values)
  }

  // generate context from this Atomic
  render() {
    const { state, context } = this
  }
}

exports.VDOM = class VDOM {
  name = 'DOM'
  context = '<div>{{ name }}</div>'
  components = []
  componentDetail = []
  self = this
  init = function () {}
  beforeInit = function () {
    this.render()
  }

  getComponenetsDetail = function () {
    return this.components.map((item) => ({
      item: item.name,
      context: item.context,
      state: item.state,
      props: item.props,
    }))
  }
  // add components to VDOM
  addComponent = function (component) {
    this.components.push(component)
  }

  // render dom after reload components
  render = function () {}

  writeToRoot = function (root) {
    this.root = this.context
  }
}
