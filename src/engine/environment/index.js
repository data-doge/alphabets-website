const THREE = require('three')
const { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, BoxGeometry, Vector3, CylinderGeometry } = THREE
const $ = require('jquery')
const WindowResize = require('three-window-resize')
const range = require('lodash.range')
const sample = require('lodash.sample')
const round = require('lodash.round')

const numRails = 20
const groundLevel = -1
const railSpacing = 4
let railTicker = 0
const powerLineSpacing = 100
let powerLineTicker = 0

class Environment {

  constructor () {
    this.scene = new Scene()

    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 50)
    this.camera.position.z = 0
    this.camera.position.y = 0
    this.camera.lookAt(new Vector3(0, 0, 0))

    this.renderer = new WebGLRenderer({alpha: true, canvas: $('#three-canvas')[0]})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xffffff, 1)

    const windowResize = new WindowResize(this.renderer, this.camera)
    console.log({ windowResize })

    this.addRailSegmentsToScene(numRails)
    this.addPowerLinesToScene()
  }

  render () {
    this.camera.position.z -= 0.1 // reciprocal of incrementor must be a whole number or everything is fucked
    if (this.isReadyToAddRailSegment()) { this.addRailSegmentToEnd() }
    if (this.isReadyToAddPowerLine()) { this.addPowerLineToEnd() }
    this.renderer.render(this.scene, this.camera)
  }

  // 'private'

  isReadyToAddRailSegment () {
    return round(-this.camera.position.z, 1) % railSpacing === 0
  }

  isReadyToAddPowerLine () {
    return round(-this.camera.position.z, 1) % powerLineSpacing === 0
  }

  addPowerLineToEnd () {
    let powerLineToRemove = this.powerLines.shift()
    this.scene.remove(powerLineToRemove.pole)
    this.scene.remove(powerLineToRemove.cross)
    let powerLineToAdd = this.createPowerLine()
    this.powerLines.push(powerLineToAdd)
    this.scene.add(powerLineToAdd.pole)
    this.scene.add(powerLineToAdd.cross)
  }

  addRailSegmentToEnd () {
    let railSegmentToRemove = this.railSegments.shift()
    this.scene.remove(railSegmentToRemove.left)
    this.scene.remove(railSegmentToRemove.right)
    let railSegmentToAdd = this.createRailSegment()
    this.railSegments.push(railSegmentToAdd)
    this.scene.add(railSegmentToAdd.left)
    this.scene.add(railSegmentToAdd.right)
  }

  addPowerLinesToScene () {
    const numberOfPowerLines = numRails * railSpacing / powerLineSpacing
    this.powerLines = range(numberOfPowerLines).map(() => this.createPowerLine())
    this.powerLines.forEach(({ cross, pole }) => {
      this.scene.add(cross)
      this.scene.add(pole)
    })
  }

  createPowerLine () {
    powerLineTicker++
    const poleHeight = 3
    const material = new MeshBasicMaterial({ color: 0x000000 })
    const x = sample([-5, 5])

    const poleGeometry = new CylinderGeometry(0.02, 0.02, poleHeight, 32)
    const pole = new Mesh(poleGeometry, material)
    pole.position.set(x, groundLevel + poleHeight / 2, -powerLineTicker * powerLineSpacing)

    const crossGeometry = new CylinderGeometry(0.02, 0.02, 0.4, 32)
    const cross = new Mesh(crossGeometry, material)
    cross.rotation.z = Math.PI / 2
    cross.position.set(x, groundLevel + 2 * poleHeight / 3, -powerLineTicker * powerLineSpacing)

    return { pole, cross }
  }

  addRailSegmentsToScene (number) {
    this.railSegments = range(number).map(() => this.createRailSegment())
    this.railSegments.forEach(({ left, right }) => {
      this.scene.add(left)
      this.scene.add(right)
    })
  }

  createRailSegment () {
    railTicker++
    const geometry = new BoxGeometry(0.2, 0.02, 1)
    const material = new MeshBasicMaterial({ color: 0x000000 })
    const left = new Mesh(geometry, material)
    left.position.set(-3, groundLevel, -railTicker * railSpacing)
    const right = new Mesh(geometry, material)
    right.position.set(3, groundLevel, -railTicker * railSpacing)
    return { left, right }
  }

}

module.exports = Environment
