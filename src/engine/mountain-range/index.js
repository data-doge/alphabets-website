const $ = require('jquery')
const scale = require('scale-number-range')
const convert = require('color-convert')

class MountainRange {

  constructor () {
    this.canvas = $('#mountain-range')[0]
    this.ctx = this.canvas.getContext('2d')
    this.ctx.lineWidth = 2
    this.strokeStyle = 'black'
    this.setDimensions()
    this.bindEventListeners()
  }

  bindEventListeners () {
    $(window).resize(this.setDimensions.bind(this))
  }

  setDimensions () {
    this.canvas.width = $(window).width()
    this.canvas.height = $(window).height() * 0.5111
  }

  render (data) {
    let pointYCoords = []
    data.forEach(y => {
      pointYCoords.push(y * this.canvas.height * 0.002)
      pointYCoords.push(0)
    })
    const coords = pointYCoords.map((y, i, arr) => ({
      x: scale(i + 1, 0, arr.length, 0, this.canvas.width),
      y: this.canvas.height - 1 * y
    }))

    this.ctx.strokeStyle = this.strokeStyle
    this.ctx.beginPath()
    this.ctx.moveTo(0, this.canvas.height)
    let i
    for (i = 0; i < coords.length - 2; i++) {
      const xc = (coords[i].x + coords[i + 1].x) / 2
      const yc = (coords[i].y + coords[i + 1].y) / 2
      this.ctx.quadraticCurveTo(coords[i].x, coords[i].y, xc, yc)
    }
    this.ctx.quadraticCurveTo(coords[i].x, coords[i].y, coords[i + 1].x, coords[i + 1].y)
    this.ctx.lineTo(0, this.canvas.height)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.stroke()
  }

  makeDarker (currentCount, totalCount) {
    const opacity = currentCount / totalCount
    const strokeStyle = convert.hsl.hex(0, 0, opacity * 100)
    this.strokeStyle = `#${strokeStyle}`
  }

  makeLighter (currentCount, totalCount) {
    const opacity = currentCount / totalCount
    const strokeStyle = convert.hsl.hex(0, 0, (1 - opacity) * 100)
    this.strokeStyle = `#${strokeStyle}`
  }

}

module.exports = MountainRange
