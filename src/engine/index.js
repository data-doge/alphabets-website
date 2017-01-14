// const Stats = require('stats-js')
// var stats = new Stats()
// stats.setMode(0) // 0: fps, 1: ms
// stats.domElement.style.position = 'absolute'
// stats.domElement.style.left = '0px'
// stats.domElement.style.top = '0px'
// document.body.appendChild(stats.domElement)
//
const $ = require('jquery')
const loop = require('raf-loop')
const Environment = require('./environment')
const View = require('./view')
const Space = require('./space')
const AudioInterface = require('./audio-interface')
const round = require('lodash.round')

class Engine {

  constructor () {
    this.environment = new Environment()
    this.view = new View()
    this.space = new Space()
    this.audioInterface = new AudioInterface()
  }

  bindEventListeners () {
    $(window).load(this.view.closeLoadingScreen)
  }

  start () {
    this.space.show()
    let deg = 0
    const lightChangeCountdown = 20
    loop(t => {
      // stats.begin()
      this.environment.render()
      deg -= 0.2
      const { overallAmplitude } = this.audioInterface.measure()
      this.space.update(deg / 180 * Math.PI, overallAmplitude)

      const ticker = -1 * round(deg, 1) % 180
      if (ticker > 180 - lightChangeCountdown) {
        let currentCount = 180 - ticker
        // if (this.view.isDay()) {
          this.view.makeDarker(currentCount, lightChangeCountdown)
          this.environment.makeLighter(currentCount, lightChangeCountdown)
        // } else {

        // }
      }
      // stats.end()
    }).start()
  }

}

module.exports = Engine
