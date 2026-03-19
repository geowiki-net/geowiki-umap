import geojson2elements from '@geowiki-net/geowiki-api/src/geojson2elements.js'

function convertFromUmap (content) {
  content = JSON.parse(content)
  
  const result = {
    elements: []
  }

  content.layers.forEach(layer => {
    layer.features.forEach(feature => {
      const elements = []
      geojson2elements(feature, elements, {})

      elements.forEach(el => {
        el.tags._umap = { ...layer._storage, ...(feature.properties._storage_options || {}) }
        delete el.tags._storage_options
      })

      result.elements = result.elements.concat(elements)
    })
  })

  return result
}

export default convertFromUmap
