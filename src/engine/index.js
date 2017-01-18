const $ = require('jquery')
const loop = require('raf-loop')
const Environment = require('./environment')
const View = require('./view')
const Space = require('./space')
const AudioInterface = require('./audio-interface')
const round = require('lodash.round')
const MountainRange = require('./mountain-range')

class Engine {

  constructor () {
    this.environment = new Environment()
    this.view = new View()
    this.space = new Space()
    this.audioInterface = new AudioInterface()
    this.mountainRange = new MountainRange()
  }

  bindEventListeners () {
    $(window).load(this.view.closeLoadingScreen)
  }

  start () {
    let deg = 0
    let isDay = true
    const lightChangeCountdown = 20
    this.space.show()

    loop(t => {
      this.environment.render()
      deg += 0.1
      const { overallAmplitude, frequencies } = this.audioInterface.measure()
      this.mountainRange.render(frequencies)
      
      this.space.update(-1 * deg / 180 * Math.PI, overallAmplitude)
      const ticker = 1 * round(deg, 1) % 180
      if (ticker % 180 === 0) { isDay = !isDay }
      if (ticker > 180 - lightChangeCountdown) {
        let currentCount = 180 - ticker
        if (isDay) {
          this.view.makeDarker(currentCount, lightChangeCountdown)
          this.environment.makeLighter(currentCount, lightChangeCountdown)
          this.mountainRange.makeLighter(currentCount, lightChangeCountdown)
        } else {
          this.view.makeLighter(currentCount, lightChangeCountdown)
          this.environment.makeDarker(currentCount, lightChangeCountdown)
          this.mountainRange.makeDarker(currentCount, lightChangeCountdown)
        }
      }
    }).start()
  }

}

module.exports = Engine
