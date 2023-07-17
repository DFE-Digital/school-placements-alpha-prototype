const paginationHelper = require('../helpers/pagination')
const utilsHelper = require('../helpers/utils')

exports.list = async (req, res) => {
  // const defaults = req.session.data.defaults

  // if (process.env.USER_JOURNEY === 'filter' && req.session.data.filter === undefined) {
  //   req.session.data.filter = {}
  // }

  // Search
  const keywords = req.session.data.keywords

  const hasSearch = !!((keywords))

  // Filters
  const a = null
  const b = null
  const c = null

  let as
  if (req.session.data.filter?.a) {
    as = utilsHelper.getCheckboxValues(a, req.session.data.filter.a)
  }
  // else {
  //   as = defaults.a
  // }

  let bs
  if (req.session.data.filter?.b) {
    bs = utilsHelper.getCheckboxValues(b, req.session.data.filter.b)
  }
  // else {
  //   bs = defaults.b
  // }

  let cs
  if (req.session.data.filter?.c) {
    cs = utilsHelper.getCheckboxValues(c, req.session.data.filter.c)
  }
  // else {
  //   cs = defaults.c
  // }

  const hasFilters = !!((as?.length > 0)
    || (bs?.length > 0)
    || (cs?.length > 0)
  )

  let selectedFilters = null

  if (hasFilters) {
    selectedFilters = {
      categories: []
    }

    if (as?.length) {
      selectedFilters.categories.push({
        heading: { text: 'Filter A' },
        items: as.map((a) => {
          return {
            text: utilsHelper.getFilterALabel(a),
            href: `/results/remove-a-filter/${a}`
          }
        })
      })
    }

    if (bs?.length) {
      selectedFilters.categories.push({
        heading: { text: 'Filter B' },
        items: bs.map((b) => {
          return {
            text: utilsHelper.getFilterBLabel(b),
            href: `/results/remove-b-filter/${b}`
          }
        })
      })
    }

    if (cs?.length) {
      selectedFilters.categories.push({
        heading: { text: 'Filter C' },
        items: cs.map((c) => {
          return {
            text: utilsHelper.getFilterCLabel(c),
            href: `/results/remove-c-filter/${c}`
          }
        })
      })
    }
  }

  let selectedA
  if (req.session.data.filter?.a) {
    selectedA = req.session.data.filter.a
  }
  // else {
  //   selectedA = defaults.a
  // }

  const filterAItems = utilsHelper.getFilterAItems(selectedA)

  let selectedB
  if (req.session.data.filter?.b) {
    selectedB = req.session.data.filter.b
  }
  // else {
  //   selectedB = defaults.b
  // }

  const filterBItems = utilsHelper.getFilterBItems(selectedB)

  let selectedC
  if (req.session.data.filter?.c) {
    selectedC = req.session.data.filter.c
  }
  // else {
  //   selectedC = defaults.c
  // }

  const filterCItems = utilsHelper.getFilterCItems(selectedC)

  // Search radius - 5, 10, 50
  // default to 50
  // needed to get a list of results rather than 1
  // const radius = req.session.data.radius || req.query.radius || defaults.radius

  // Search query
  // const q = req.session.data.q || req.query.q

  // sort by settings
  // const sortBy = req.query.sortBy || req.session.data.sortBy || 0
  // const sortByItems = utilsHelper.getCourseSortBySelectOptions(sortBy)

  // pagination settings
  // const page = req.query.page || 1
  // const perPage = 20

  const results = []
  const resultsCount = 0

  res.render('../views/results/index', {
    results,
    resultsCount,
    selectedFilters,
    hasFilters,
    hasSearch,
    keywords,
    filterAItems,
    filterBItems,
    filterCItems,
    actions: {
      view: '/course/',
      filters: {
        apply: '/results',
        remove: '/results/remove-all-filters'
      },
      search: {
        find: '/results',
        remove: '/results/remove-keyword-search'
      }
    }
  })

}

exports.removeKeywordSearch = (req, res) => {
  delete req.session.data.keywords
  delete req.session.data.provider
  delete req.session.data.q
  res.redirect('/results')
}

exports.removeFilterA = (req, res) => {
  req.session.data.filter.a = utilsHelper.removeFilter(req.params.a, req.session.data.filter.a)
  res.redirect('/results')
}

exports.removeFilterB = (req, res) => {
  req.session.data.filter.b = utilsHelper.removeFilter(req.params.b, req.session.data.filter.b)
  res.redirect('/results')
}

exports.removeFilterC = (req, res) => {
  req.session.data.filter.c = utilsHelper.removeFilter(req.params.c, req.session.data.filter.c)
  res.redirect('/results')
}

exports.removeAllFilters = (req, res) => {
  delete req.session.data.filter
  res.redirect('/results')
}
