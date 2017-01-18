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
    const coords = pointYCoords.map((y, i, arr) => ({
      x: scale(i + 1, 0, arr.length, 0, width),
      y: height - 1 * y
    }))

    ctx.beginPath()
    ctx.moveTo(0, height)
    let i
    for (i = 0; i < coords.length - 2; i++) {
      const xc = (coords[i].x + coords[i + 1].x) / 2
      const yc = (coords[i].y + coords[i + 1].y) / 2
      ctx.quadraticCurveTo(coords[i].x, coords[i].y, xc, yc)
    }
    ctx.quadraticCurveTo(coords[i].x, coords[i].y, coords[i + 1].x, coords[i + 1].y)
    ctx.lineTo(0, height)
    ctx.fill()
  }

}

module.exports = Engine
