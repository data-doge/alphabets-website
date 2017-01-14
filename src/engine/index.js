// const Stats = require('stats-js')
// var stats = new Stats()
// stats.setMode(0) // 0: fps, 1: ms
// stats.domElement.style.position = 'absolute'
// stats.domElement.style.left = '0px'
// stats.domElement.style.top = '0px'
// document.body.appendChild(stats.domElement)
//
const Environment = require('./environment')
const View = require('./view')
const Space = require('./space')
const $ = require('jquery')
const loop = require('raf-loop')

class Engine {

  constructor () {
    this.environment = new Environment()
    this.view = new View()
    this.space = new Space()
  }

  bindEventListeners () {
    $(window).load(this.view.closeLoadingScreen)
  }

  start () {
    this.space.show()
    let deg = 0
    loop(t => {
      // stats.begin()
      this.environment.render()
      deg--
      this.space.update(deg / 180 * Math.PI)
      if (deg % 180 === 0) {
        this.view.invertColors()
        this.environment.invertColors()
      }
      // stats.end()
    }).start()
  }

}

module.exports = Engine
