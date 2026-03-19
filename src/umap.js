import GeowikiAPI from '@geowiki-net/geowiki-api'
import convertFromUmap from './convertFromUmap.js'

GeowikiAPI.registerFileFormat({
  id: 'umap',

  willLoad (url, content, options) {
    return !!url.match(/\.umap$/i)
  },

  load (content, options, callback) {
    const data = convertFromUmap(content, options)
    console.log(JSON.stringify(data, null, '  '))
    callback(null, data)
  }
})
