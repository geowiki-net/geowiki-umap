const GeowikiAPI = require('@geowiki-net/geowiki-api')
const convertFromUmap = require('./convertFromUmap.js')

GeowikiAPI.registerFileFormat({
  id: 'umap',

  willLoad (url, content, options) {
    return !!url.match(/\.umap$/i)
  },

  load (content, options, callback) {
    const data = convertFromUmap(content, options)
    callback(null, data)
  }
})
