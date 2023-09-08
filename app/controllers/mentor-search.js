const schoolModel = require('../models/schools')

const paginationHelper = require('../helpers/pagination')
const subjectHelper = require('../helpers/subjects')
const utilsHelper = require('../helpers/utils')

exports.list_mentors_results_get = (req, res) => {
  // Search
  const keywords = req.session.data.keywords

  const hasSearch = !!((keywords))

  // Filters
  const a = null
  const b = null
  const c = null
  const d = null
  const e = null
  const f = null
  const g = null
  const h = null
  const i = null
  const j = null

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

  let es
  if (req.session.data.filter?.d) {
    es = utilsHelper.getCheckboxValues(e, req.session.data.filter.e)
  }

  let fs
  if (req.session.data.filter?.d) {
    fs = utilsHelper.getCheckboxValues(f, req.session.data.filter.f)
  }

  let gs
  if (req.session.data.filter?.d) {
    gs = utilsHelper.getCheckboxValues(g, req.session.data.filter.g)
  }

  let hs
  if (req.session.data.filter?.d) {
    hs = utilsHelper.getCheckboxValues(h, req.session.data.filter.h)
  }

  let is
  if (req.session.data.filter?.d) {
    is = utilsHelper.getCheckboxValues(i, req.session.data.filter.i)
  }

  let js
  if (req.session.data.filter?.d) {
    js = utilsHelper.getCheckboxValues(j, req.session.data.filter.j)
  }

  const hasFilters = !!((as?.length > 0)
    || (bs?.length > 0)
    || (cs?.length > 0)
    || (ds?.length > 0)
    || (es?.length > 0)
    || (fs?.length > 0)
    || (gs?.length > 0)
    || (hs?.length > 0)
    || (is?.length > 0)
    || (js?.length > 0)
  )

  let selectedFilters = null

  if (hasFilters) {
    selectedFilters = {
      categories: []
    }

    if (as?.length) {
      selectedFilters.categories.push({
        heading: { text: 'Subject' },
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
        heading: { text: 'Age range' },
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
        heading: { text: 'School type' },
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
        heading: { text: 'Gender' },
        items: ds.map((d) => {
          return {
            text: utilsHelper.getFilterDLabel(d),
            href: `/organisations/${req.params.organisationId}/mentors/remove-d-filter/${d}`
          }
        })
      })
    }

    if (es?.length) {
      selectedFilters.categories.push({
        heading: { text: 'Religious character' },
        items: es.map((e) => {
          return {
            text: utilsHelper.getFilterELabel(e),
            href: `/organisations/${req.params.organisationId}/mentors/remove-e-filter/${e}`
          }
        })
      })
    }

    if (fs?.length) {
      selectedFilters.categories.push({
        heading: { text: 'SEN provision' },
        items: fs.map((f) => {
          return {
            text: utilsHelper.getFilterFLabel(f),
            href: `/organisations/${req.params.organisationId}/mentors/remove-f-filter/${f}`
          }
        })
      })
    }

    if (gs?.length) {
      selectedFilters.categories.push({
        heading: { text: 'Ofsted rating' },
        items: gs.map((g) => {
          return {
            text: utilsHelper.getFilterGLabel(g),
            href: `/organisations/${req.params.organisationId}/mentors/remove-g-filter/${g}`
          }
        })
      })
    }

    if (hs?.length) {
      selectedFilters.categories.push({
        heading: { text: 'Key stage' },
        items: hs.map((h) => {
          return {
            text: utilsHelper.getFilterHLabel(h),
            href: `/organisations/${req.params.organisationId}/mentors/remove-h-filter/${h}`
          }
        })
      })
    }

    if (is?.length) {
      selectedFilters.categories.push({
        heading: { text: 'Admissions policy' },
        items: is.map((i) => {
          return {
            text: utilsHelper.getFilterILabel(i),
            href: `/organisations/${req.params.organisationId}/mentors/remove-i-filter/${i}`
          }
        })
      })
    }

    if (js?.length) {
      selectedFilters.categories.push({
        heading: { text: 'ECF training' },
        items: js.map((j) => {
          return {
            text: utilsHelper.getFilterJLabel(j),
            href: `/organisations/${req.params.organisationId}/mentors/remove-j-filter/${j}`
          }
        })
      })
    }
  }

  let selectedA
  if (req.session.data.filter?.a) {
    selectedA = req.session.data.filter.a
  }

  const filterAItems = utilsHelper.getSubjectFilterItems(selectedA)

  let selectedB
  if (req.session.data.filter?.b) {
    selectedB = req.session.data.filter.b
  }

  const filterBItems = utilsHelper.getAgeRangeFilterItems(req.session.data.ageGroup, selectedB)

  let selectedC
  if (req.session.data.filter?.c) {
    selectedC = req.session.data.filter.c
  }

  const filterCItems = utilsHelper.getSchoolTypeFilterItems(selectedC)

  let selectedD
  if (req.session.data.filter?.d) {
    selectedD = req.session.data.filter.d
  }

  const filterDItems = utilsHelper.getGenderFilterItems(selectedD)

  let selectedE
  if (req.session.data.filter?.e) {
    selectedE = req.session.data.filter.e
  }

  const filterEItems = utilsHelper.getReligiousCharacterFilterItems(selectedE)

  let selectedF
  if (req.session.data.filter?.f) {
    selectedF = req.session.data.filter.f
  }

  const filterFItems = utilsHelper.getSENDFilterItems(selectedF)

  let selectedG
  if (req.session.data.filter?.g) {
    selectedG = req.session.data.filter.g
  }

  const filterGItems = utilsHelper.getOfsteadRatingFilterItems(selectedG)

  let selectedH
  if (req.session.data.filter?.h) {
    selectedH = req.session.data.filter.h
  }

  const filterHItems = utilsHelper.getKeyStageFilterItems(req.session.data.ageGroup, selectedH)

  let selectedI
  if (req.session.data.filter?.i) {
    selectedI = req.session.data.filter.i
  }

  const filterIItems = utilsHelper.getAdmissionsPolicyFilterItems(selectedI)

  let selectedJ
  if (req.session.data.filter?.j) {
    selectedJ = req.session.data.filter.j
  }

  const filterJItems = utilsHelper.getECFTrainingFilterItems(selectedJ)

  let results = require('../data/temp/mentors-sprint6')
  const resultsCount = results.length

  // Get the pagination data
  const pageSize = 10
  const pagination = paginationHelper.getPagination(results, req.query.page, pageSize)

  // Get a slice of the data to display
  results = paginationHelper.getDataByPage(results, pagination.pageNumber, pageSize)

  // sort by settings
  const sortBy = req.query.sortBy || req.session.data.sortBy || 0
  const sortByItems = utilsHelper.getSortBySelectOptions(sortBy)

  res.render('../views/mentors/results/index', {
    results,
    resultsCount,
    selectedFilters,
    hasFilters,
    hasSearch,
    keywords,
    sortByItems,
    pagination,
    filterAItems,
    filterBItems,
    filterCItems,
    filterDItems,
    filterEItems,
    filterFItems,
    filterGItems,
    filterHItems,
    filterIItems,
    filterJItems,
    // selectedA,
    // selectedC,
    // selectedE,
    // selectedF,
    actions: {
      view: `/organisations/${req.params.organisationId}/mentors`,
      filters: {
        apply: `/organisations/${req.params.organisationId}/mentors`,
        remove: `/organisations/${req.params.organisationId}/mentors/remove-all-filters`
      },
      search: {
        find: `/organisations/${req.params.organisationId}/mentors`,
        remove: `/organisations/${req.params.organisationId}/mentors/remove-keyword-search`,
        change: `/organisations/${req.params.organisationId}/mentors/search`
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

exports.removeFilterE = (req, res) => {
  req.session.data.filter.e = utilsHelper.removeFilter(req.params.e, req.session.data.filter.e)
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}

exports.removeFilterF = (req, res) => {
  req.session.data.filter.f = utilsHelper.removeFilter(req.params.f, req.session.data.filter.f)
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}

exports.removeFilterG = (req, res) => {
  req.session.data.filter.g = utilsHelper.removeFilter(req.params.g, req.session.data.filter.g)
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}

exports.removeFilterH = (req, res) => {
  req.session.data.filter.h = utilsHelper.removeFilter(req.params.h, req.session.data.filter.h)
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}

exports.removeFilterI = (req, res) => {
  req.session.data.filter.i = utilsHelper.removeFilter(req.params.i, req.session.data.filter.i)
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}

exports.removeFilterJ = (req, res) => {
  req.session.data.filter.j = utilsHelper.removeFilter(req.params.j, req.session.data.filter.j)
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}

exports.removeAllFilters = (req, res) => {
  delete req.session.data.filter
  res.redirect(`/organisations/${req.params.organisationId}/mentors`)
}


// SEARCH
exports.search_get = (req, res) => {
  delete req.session.data.filter
  delete req.session.data.location
  delete req.session.data.school
  delete req.session.data.q
  delete req.session.data.sortBy

  res.render('mentors/search/index', {
    actions: {
      back: `/organisations/${req.params.organisationId}/mentors`,
      save: `/organisations/${req.params.organisationId}/mentors/search`
    }
  })
}

exports.search_post = (req, res) => {
  // Search query
  // const q = req.session.data.q || req.query.q

  const errors = []

  if (req.session.data.q === undefined) {
    const error = {}
    error.fieldName = "q"
    error.href = "#q"
    error.text = "Select find mentors by location or by school"
    errors.push(error)
  } else {
    if (req.session.data.q === 'location' && !req.session.data.location.length) {
      const error = {}
      error.fieldName = "location"
      error.href = "#location"
      error.text = "Enter a city, town or postcode"
      errors.push(error)
    }

    if (req.session.data.q === 'school' && !req.session.data.school.length) {
      const error = {}
      error.fieldName = "school"
      error.href = "#school"
      error.text = "Enter a school name, URN or postcode"
      errors.push(error)
    }
  }

  if (errors.length) {
    res.render('mentors/search/index', {
      errors,
      actions: {
        back: `/organisations/${req.params.organisationId}/mentors`,
        save: `/organisations/${req.params.organisationId}/mentors/search`
      }
    })
  } else {
    res.redirect(`/organisations/${req.params.organisationId}/mentors/age-groups`)
  }
}

exports.age_groups_get = (req, res) => {
  res.render('mentors/search/age-groups', {
    actions: {
      back: `/organisations/${req.params.organisationId}/mentors/search`,
      save: `/organisations/${req.params.organisationId}/mentors/age-groups`
    }
  })
}

exports.age_groups_post = (req, res) => {
  const ageGroup = req.session.data.ageGroup

  const errors = []

  if (!req.session.data.ageGroup?.length) {
    const error = {}
    error.fieldName = "age-groups"
    error.href = "#age-groups"
    error.text = "Select an age group"
    errors.push(error)
  }

  if (errors.length) {
    res.render('mentors/search/age-groups', {
      errors,
      actions: {
        back: `/organisations/${req.params.organisationId}/mentors/search`,
        save: `/organisations/${req.params.organisationId}/mentors/age-groups`
      }
    })
  } else {
    if (ageGroup === 'primary') {
      res.redirect(`/organisations/${req.params.organisationId}/mentors/primary-subjects`)
    } else if (ageGroup === 'secondary') {
      res.redirect(`/organisations/${req.params.organisationId}/mentors/secondary-subjects`)
    } else {
      res.redirect(`/organisations/${req.params.organisationId}/mentors/results`)
    }
  }
}

exports.primary_subjects_get = (req, res) => {
  let selectedSubject
  if (req.session.data.filter?.subject) {
    selectedSubject = req.session.data.filter.subject
  }

  const subjectOptions = subjectHelper.getSubjectOptions(req.session.data.ageGroup, selectedSubject)

  res.render('mentors/search/primary-subjects', {
    subjectOptions,
    actions: {
      back: `/organisations/${req.params.organisationId}/mentors/age-groups`,
      save: `/organisations/${req.params.organisationId}/mentors/primary-subjects`
    }
  })
}

exports.primary_subjects_post = (req, res) => {
  const errors = []

  if (!req.session.data.filter.subject?.length) {
    const error = {}
    error.fieldName = "subject"
    error.href = "#subject"
    error.text = "Select a least one primary subject specialism"
    errors.push(error)
  }

  if (errors.length) {
    let selectedSubject
    if (req.session.data.filter?.subject) {
      selectedSubject = req.session.data.filter.subject
    }

    const subjectOptions = subjectHelper.getSubjectOptions(req.session.data.ageGroup, selectedSubject)

    res.render('mentors/search/primary-subjects', {
      subjectOptions,
      errors,
      actions: {
        back: `/organisations/${req.params.organisationId}/mentors/age-groups`,
        save: `/organisations/${req.params.organisationId}/mentors/primary-subjects`
      }
    })
  } else {
    res.redirect(`/organisations/${req.params.organisationId}/mentors/results`)
  }
}

exports.secondary_subjects_get = (req, res) => {
  let selectedSubject
  if (req.session.data.filter?.subject) {
    selectedSubject = req.session.data.filter.subject
  }

  const subjectOptions = subjectHelper.getSubjectOptions(req.session.data.ageGroup, selectedSubject)

  res.render('mentors/search/secondary-subjects', {
    subjectOptions,
    actions: {
      back: `/organisations/${req.params.organisationId}/mentors/age-groups`,
      save: `/organisations/${req.params.organisationId}/mentors/secondary-subjects`
    }
  })
}

exports.secondary_subjects_post = (req, res) => {
  const errors = []

  if (!req.session.data.filter.subject?.length) {
    const error = {}
    error.fieldName = "subject"
    error.href = "#subject"
    error.text = "Select at least one secondary subject"
    errors.push(error)
  }

  if (errors.length) {
    let selectedSubject
    if (req.session.data.filter?.subject) {
      selectedSubject = req.session.data.filter.subject
    }

    const subjectOptions = subjectHelper.getSubjectOptions(req.session.data.ageGroup, selectedSubject)

    res.render('mentors/search/secondary-subjects', {
      subjectOptions,
      errors,
      actions: {
        back: `/organisations/${req.params.organisationId}/mentors/age-groups`,
        save: `/organisations/${req.params.organisationId}/mentors/secondary-subjects`
      }
    })
  } else {
    res.redirect(`/organisations/${req.params.organisationId}/mentors/results`)
  }
}

/// ------------------------------------------------------------------------ ///
/// SHOW mentor
/// ------------------------------------------------------------------------ ///

exports.show_mentors_get = (req, res) => {
  const mentors = require('../data/temp/mentors-sprint6')
  const mentor = mentors.find(mentor => mentor.id === req.params.mentorId)

  const school = schoolModel.findOne({ schoolId: mentor.urn })

  res.render('../views/mentors/show', {
    school,
    mentor,
    actions: {
      back: `/organisations/${req.params.organisationId}/mentors/results`
    }
  })
}
