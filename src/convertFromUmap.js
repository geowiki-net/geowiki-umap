const geojson2elements = require('@geowiki-net/geowiki-api/src/geojson2elements.js')

module.exports = function convertFromUmap (content) {
  content = JSON.parse(content)
  
  const result = {
    version: 0.6,
    generator: 'geowiki-module-umap',
    elements: []
  }

  if (content.properties.center) {
    result.center = {
      lat: content.properties.center.lat,
      lon: content.properties.center.lng
    }
    result.zoom = content.properties.zoom
  }

  result.tags = {}
  Object.entries(content.properties).forEach(([k, v]) => result.tags['_umap_' + k] = v)
  result.tags.name = content.properties.name

  if (content.properties.name) {
    result.tags.name = content.properties.name
  }

  content.layers.forEach(layer => {
    layer.features.forEach(feature => {
      const elements = []
      geojson2elements(feature, elements, {})

      elements.forEach(el => {
        const _umap = { ...layer._umap_options, ...layer._storage, ...(feature.properties._umap_options || feature.properties._storage_options || {}) }
        Object.entries(_umap).forEach(([k, v]) => el.tags['_umap_' + k] = v)
        delete el.tags._storage_options
        delete el.tags._umap_options
      })

      result.elements = result.elements.concat(elements)
    })
  })

  return result
}
