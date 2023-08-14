const utilsHelper = require('../helpers/utils')

exports.list_mentors_get = (req, res) => {
  // Search
  const keywords = req.session.data.keywords

  const hasSearch = !!((keywords))

  // Filters
  const a = null
  const b = null
  const c = null
  const d = null

  let as
  if (req.session.data.filter?.a) {
    as = utilsHelper.getCheckboxValues(a, req.session.data.filter.a)
  }

  let bs
  if (req.session.data.filter?.b) {
    bs = utilsHelper.getCheckboxValues(b, req.session.data.filter.b)
  }

  let cs
  if (req.session.data.filter?.c) {
    cs = utilsHelper.getCheckboxValues(c, req.session.data.filter.c)
  }

  let ds
  if (req.session.data.filter?.d) {
    ds = utilsHelper.getCheckboxValues(d, req.session.data.filter.d)
  }

  const hasFilters = !!((as?.length > 0)
    || (bs?.length > 0)
    || (cs?.length > 0)
    || (ds?.length > 0)
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
            href: `/organisations/${req.params.organisationId}/mentors/remove-a-filter/${a}`
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
            href: `/organisations/${req.params.organisationId}/mentors/remove-b-filter/${b}`
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
            href: `/organisations/${req.params.organisationId}/mentors/remove-c-filter/${c}`
          }
        })
      })
    }

    if (ds?.length) {
      selectedFilters.categories.push({
        heading: { text: 'Filter D' },
        items: ds.map((d) => {
          return {
            text: utilsHelper.getFilterDLabel(d),
            href: `/organisations/${req.params.organisationId}/mentors/remove-d-filter/${d}`
          }
        })
      })
    }
  }

  let selectedA
  if (req.session.data.filter?.a) {
    selectedA = req.session.data.filter.a
  }

  const filterAItems = utilsHelper.getFilterAItems(selectedA)

  let selectedB
  if (req.session.data.filter?.b) {
    selectedB = req.session.data.filter.b
  }

  const filterBItems = utilsHelper.getFilterBItems(selectedB)

  let selectedC
  if (req.session.data.filter?.c) {
    selectedC = req.session.data.filter.c
  }

  const filterCItems = utilsHelper.getFilterCItems(selectedC)

  let selectedD
  if (req.session.data.filter?.d) {
    selectedD = req.session.data.filter.d
  }

  const filterDItems = utilsHelper.getFilterDItems(selectedD)

  const results = []
  const resultsCount = results.length

  // results.sort((a, b) => {
  //   return a.name.localeCompare(b.name) || a.school.name.localeCompare(b.school.name)
  // })

  res.render('../views/mentors/list', {
    results,
    resultsCount,
    selectedFilters,
    hasFilters,
    hasSearch,
    keywords,
    filterAItems,
    filterBItems,
    filterCItems,
    filterDItems,
    actions: {
      view: `/organisations/${req.params.organisationId}/mentors`,
      filters: {
        apply: `/organisations/${req.params.organisationId}/mentors`,
        remove: `/organisations/${req.params.organisationId}/mentors/remove-all-filters`
      },
      search: {
        find: `/organisations/${req.params.organisationId}/mentors`,
        remove: `/organisations/${req.params.organisationId}/mentors/remove-keyword-search`
      }
    }
  })
}

exports.removeKeywordSearch = (req, res) => {
  delete req.session.data.keywords
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}

exports.removeFilterA = (req, res) => {
  req.session.data.filter.a = utilsHelper.removeFilter(req.params.a, req.session.data.filter.a)
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}

exports.removeFilterB = (req, res) => {
  req.session.data.filter.b = utilsHelper.removeFilter(req.params.b, req.session.data.filter.b)
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}

exports.removeFilterC = (req, res) => {
  req.session.data.filter.c = utilsHelper.removeFilter(req.params.c, req.session.data.filter.c)
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}

exports.removeFilterD = (req, res) => {
  req.session.data.filter.d = utilsHelper.removeFilter(req.params.d, req.session.data.filter.d)
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}

exports.removeAllFilters = (req, res) => {
  delete req.session.data.filter
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}
