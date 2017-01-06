const THREE = require('three')
const { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, AxisHelper, BoxGeometry, Vector3 } = THREE
const $ = require('jquery')
const OrbitControls = require('three-orbit-controls')(THREE)
const WindowResize = require('three-window-resize')
const range = require('lodash.range')

class Environment {

  constructor () {
    this.scene = new Scene()

    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
    this.camera.position.z = 2
    this.camera.position.y = 0
    this.camera.lookAt(new Vector3(0, 0, 0))

    this.controls = new OrbitControls(this.camera)

    this.renderer = new WebGLRenderer({alpha: true, canvas: $('#three-canvas')[0]})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xffffff, 1)

    const windowResize = new WindowResize(this.renderer, this.camera)
    console.log({ windowResize })

    const axisHelper = new AxisHelper(1)
    this.scene.add(axisHelper)

    this.addRails()
  }

  render () {
    // this.camera.position.z -= 0.1
    this.renderer.render(this.scene, this.camera)
  }

  // 'private'

  addRails () {
    range(100).forEach(i => this.addRailSegment(i))
  }

  addRailSegment (i) {
    const geometry = new BoxGeometry(0.2, 0.1, 1)
    const material = new MeshBasicMaterial({ color: 0x000000 })
    const leftRail = new Mesh(geometry, material)
    this.scene.add(leftRail)
    leftRail.position.z = -i * 4
    leftRail.position.y = -1
    leftRail.position.x = -3
    const rightRail = new Mesh(geometry, material)
    this.scene.add(rightRail)
    rightRail.position.z = -i * 4
    rightRail.position.y = -1
    rightRail.position.x = 3
  }

}

module.exports = Environment
