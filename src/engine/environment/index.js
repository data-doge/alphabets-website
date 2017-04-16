const THREE = require('three')
const { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, Vector3, Color } = THREE
const $ = require('jquery')
const WindowResize = require('three-window-resize')

const { railSpacing, powerLineSpacing, numRails, numberOfPowerLines } = require('../constants')
const Collection = require('./collection')
const RailSegment = require('./rail-segment')
const PowerLine = require('./power-line')

class Environment {
  constructor () {
    this.materialColor = 0x000000
    this.scene = new Scene()

    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 50)
    this.camera.position.z = 0
    this.camera.position.y = 0
    this.camera.lookAt(new Vector3(0, 0, 0))

    this.renderer = new WebGLRenderer({ alpha: true, canvas: $('#three-canvas')[0] })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(this.materialColor, 0)
    this.renderer.context.getShaderInfoLog = () => ''

    this.windowResize = new WindowResize(this.renderer, this.camera)

    this.railSegments = Collection({
      Entity: RailSegment,
      spacing: railSpacing,
      scene: this.scene,
      color: this.materialColor,
      count: numRails,
      camera: this.camera
    })
    this.powerLines = Collection({
      Entity: PowerLine,
      spacing: powerLineSpacing,
      scene: this.scene,
      color: this.materialColor,
      count: numberOfPowerLines,
      camera: this.camera
    })
  }

  render () {
    this.camera.position.z -= 0.1 // reciprocal of incrementor must be a whole number or everything is fucked
    this.railSegments.render(this.scene, this.camera, this.materialColor)
    this.powerLines.render(this.scene, this.camera, this.materialColor)
    this.renderer.render(this.scene, this.camera)
  }

  renderColors (primary) {
    this.materialColor = new Color(`#${primary}`)
    this.scene.traverse(node => {
      if (node instanceof Mesh) {
        node.material = new MeshBasicMaterial({ color: this.materialColor })
      }
    })
  }
}

module.exports = Environment
