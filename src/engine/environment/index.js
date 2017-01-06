const THREE = require('three')
const { AxisHelper, BoxGeometry } = THREE
const $ = require('jquery')
const OrbitControls = require('three-orbit-controls')(THREE)
const WindowResize = require('three-window-resize')
const range = require('lodash.range')

class Environment {

  constructor () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
    this.camera.position.z = 5

    this.controls = new OrbitControls(this.camera)

    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: $('#three-canvas')[0]})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xffffff, 1)

    const windowResize = new WindowResize(this.renderer, this.camera)
    console.log({ windowResize })

    const axisHelper = new AxisHelper(1)
    this.scene.add(axisHelper)

    this.addRails()
  }

  render () {
    this.renderer.render(this.scene, this.camera)
  }

  // 'private'

  addRails () {
    range(10).forEach(i => this.addRailSegment(i))
  }

  addRailSegment (i) {
    const geometry = new BoxGeometry(0.1, 0.1, 0.1)
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 })

    const leftRail = new THREE.Mesh(geometry, material)
    this.scene.add(leftRail)
    leftRail.position.z = -i
    leftRail.position.x = -3
    const rightRail = new THREE.Mesh(geometry, material)
    this.scene.add(rightRail)
    rightRail.position.z = -i
    rightRail.position.x = 3
  }

}

module.exports = Environment
