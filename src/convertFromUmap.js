const geojson2elements = require('@geowiki-net/geowiki-api/src/geojson2elements.js')

module.exports = function convertFromUmap (content) {
  content = JSON.parse(content)
  
  const result = {
    version: 0.6,
    generator: 'geowiki-umap',
    elements: []
  }

  if (content.properties.center) {
    result.center = {
      lat: content.properties.center.lat,
      lon: content.properties.center.lng
    }
    result.zoom = content.properties.zoom
  }

  result.tags = {
    _umap: content.properties
  }

  if (content.properties.name) {
    result.tags.name = content.properties.name
  }

  content.layers.forEach(layer => {
    layer.features.forEach(feature => {
      const elements = []
      geojson2elements(feature, elements, {})

      elements.forEach(el => {
        el.tags._umap = { ...layer._umap_options, ...layer._storage, ...(feature.properties._umap_options || feature.properties._storage_options || {}) }
        delete el.tags._storage_options
        delete el.tags._umap_options
      })

      result.elements = result.elements.concat(elements)
    })
  })

  return result
}
