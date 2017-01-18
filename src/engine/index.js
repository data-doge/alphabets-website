const $ = require('jquery')
const loop = require('raf-loop')
const Environment = require('./environment')
const View = require('./view')
const Space = require('./space')
const AudioInterface = require('./audio-interface')
const round = require('lodash.round')
const scale = require('scale-number-range')

const exampleData = [40, 21, 94, 213, 125, 68, 18, 126, 229, 58 ]

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
    this.loadMountainRange()

    let deg = 0
    let isDay = true
    const lightChangeCountdown = 20
    this.space.show()

    loop(t => {
      this.environment.render()
      deg += 0.1
      const { overallAmplitude } = this.audioInterface.measure()
      this.space.update(-1 * deg / 180 * Math.PI, overallAmplitude)
      const ticker = 1 * round(deg, 1) % 180
      if (ticker % 180 === 0) { isDay = !isDay }
      if (ticker > 180 - lightChangeCountdown) {
        let currentCount = 180 - ticker
        if (isDay) {
          this.view.makeDarker(currentCount, lightChangeCountdown)
          this.environment.makeLighter(currentCount, lightChangeCountdown)
        } else {
          this.view.makeLighter(currentCount, lightChangeCountdown)
          this.environment.makeDarker(currentCount, lightChangeCountdown)
        }
      }
    }).start()
  }

  loadMountainRange () {
    const canvas = $('#mountain-range')[0]
    const width = $(window).width()
    const height = $(window).height() * 0.5111
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'

    let pointYCoords = []
    exampleData.forEach(y => {
      pointYCoords.push(y)
      pointYCoords.push(0)
    })
    ctx.beginPath()
    ctx.moveTo(0, height)
    pointYCoords.forEach((y, i, arr) => {
      const x = scale(i + 1, 0, arr.length, 0, width)
      ctx.lineTo(x, height - 0.5 * y)
    })
    ctx.lineTo(0, height)
    ctx.fill()
  }

}

module.exports = Engine
