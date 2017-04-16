const range = require('lodash.range')
const round = require('lodash.round')

const Collection = ({ Entity, spacing, scene, color, count, camera }) => {
  let items = range(count).map(() => new Entity({ color, scene }))

  const addToEnd = (scene, color) => {
    items.shift().remove()
    items.push(new Entity({ color, scene }))
  }

  const isReady = camera => {
    return round(-camera.position.z, 1) % spacing === 0
  }

  return {
    render (scene, camera, color) {
      if (isReady(camera)) { addToEnd(scene, color) }
    }
  }
}

module.exports = Collection
