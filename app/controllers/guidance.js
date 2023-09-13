const _ = require('lodash')
const guidanceModel = require('../models/guidance')

exports.guidance = (req, res) => {

  if (req.params.fileName) {
    const markdown = guidanceModel.findOne({
      fileName: req.params.fileName
    })

    res.render('../views/guidance/show', {
      contentData: markdown.data,
      content: markdown.content
    })
  } else {
    let links = guidanceModel.findMany({})

    // order links
    links = _.orderBy(links, ['sortOrder'], ['asc'])

    // group guidance by section
    // group an array of objects by key
    const guidance = _.groupBy(links, 'section')

    // group an array of objects by key and remove key from object
    // const guidance = _.mapValues(_.groupBy(links, 'section'),
      // list => list.map(link => _.omit(link, 'section')))

    const sections = Object.keys(guidance)

    res.render('../views/guidance/index', {
      guidance,
      sections
    })
  }
}
