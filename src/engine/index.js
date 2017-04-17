const $ = require('jquery')
const loop = require('raf-loop')
const Environment = require('./environment')
const View = require('./view')
const Space = require('./space')
const AudioInterface = require('./audio-interface')
const round = require('lodash.round')
const MountainRange = require('./mountain-range')
const convert = require('color-convert')

class Engine {
  constructor () {
    this.environment = new Environment()
    this.space = new Space()
    this.audioInterface = new AudioInterface()
    this.view = new View({ audioInterface: this.audioInterface })
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
      deg += 0.08
      const { overallAmplitude, frequencies } = this.audioInterface.measure()
      this.mountainRange.render(frequencies)

      this.space.update(-1 * deg / 180 * Math.PI, overallAmplitude)
      const ticker = 1 * round(deg, 1) % 180
      if (ticker % 180 === 0) { isDay = !isDay }
      if (ticker > 180 - lightChangeCountdown) {
        const lightness = (180 - ticker) / lightChangeCountdown
        const colors = isDay ? {
          primary: convert.hsl.hex(0, 0, (1 - lightness) * 100),
          secondary: convert.hsl.hex(0, 0, lightness * 100)
        } : {
          primary: convert.hsl.hex(0, 0, lightness * 100),
          secondary: convert.hsl.hex(0, 0, (1 - lightness) * 100)
        }
        this.view.renderColors(colors.primary, colors.secondary)
        this.mountainRange.renderColors(colors.primary, colors.secondary)
        this.environment.renderColors(colors.primary)
      }
    }).start()
  }
}

module.exports = Engine
