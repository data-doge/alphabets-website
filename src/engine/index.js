const Stats = require('stats-js')
var stats = new Stats()
stats.setMode(0) // 0: fps, 1: ms
stats.domElement.style.position = 'absolute'
stats.domElement.style.left = '0px'
stats.domElement.style.top = '0px'
document.body.appendChild(stats.domElement)

const Environment = require('./environment')
const View = require('./view')
const $ = require('jquery')
const loop = require('raf-loop')

class Engine {

  constructor () {
    this.environment = new Environment()
    this.view = new View()
  }

  bindEventListeners () {
    $(window).load(this.view.closeLoadingScreen)
  }

  start () {
    loop(t => {
      stats.begin()
      this.environment.render()
      stats.end()
    }).start()
  }

}

module.exports = Engine
