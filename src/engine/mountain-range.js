const $ = require('jquery')
const scale = require('scale-number-range')

class MountainRange {
  constructor () {
    this.canvas = $('#mountain-range')[0]
    this.ctx = this.canvas.getContext('2d')
    this.strokeStyle = 'black'
    this.fillStyle = 'white'
    this.setDimensions()
    this.bindEventListeners()
  }

  bindEventListeners () {
    $(window).resize(this.setDimensions.bind(this))
  }

  setDimensions () {
    this.canvas.width = $(window).width()
    this.canvas.height = $(window).height()
    this.mountainRangeHeight = $(window).height() * 0.5111
  }

  render (data) {
    let pointYCoords = []
    data.forEach(y => {
      pointYCoords.push(y * this.mountainRangeHeight * 0.002)
      pointYCoords.push(0)
    })
    const coords = pointYCoords.map((y, i, arr) => ({
      x: scale(i + 1, 0, arr.length, 0, this.canvas.width),
      y: this.mountainRangeHeight - 1 * y
    }))

    this.ctx.strokeStyle = this.strokeStyle
    this.ctx.fillStyle = this.fillStyle
    this.ctx.beginPath()
    this.ctx.moveTo(0, this.mountainRangeHeight)
    let i
    for (i = 0; i < coords.length - 2; i++) {
      const xc = (coords[i].x + coords[i + 1].x) / 2
      const yc = (coords[i].y + coords[i + 1].y) / 2
      this.ctx.quadraticCurveTo(coords[i].x, coords[i].y, xc, yc)
    }
    this.ctx.quadraticCurveTo(coords[i].x, coords[i].y, coords[i + 1].x, coords[i + 1].y)
    this.ctx.lineTo(0, this.mountainRangeHeight)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillRect(0, this.mountainRangeHeight, this.canvas.width, this.canvas.height)
    this.ctx.fill()
    this.ctx.stroke()
  }

  renderColors (primary, secondary) {
    this.strokeStyle = `#${primary}`
    this.fillStyle = `#${secondary}`
  }
}

module.exports = MountainRange
