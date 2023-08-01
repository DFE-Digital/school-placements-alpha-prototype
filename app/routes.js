//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const flash = require('connect-flash')

router.use(flash())

// Controller modules
const organisationController = require('./controllers/organisations')
const placementController = require('./controllers/placements')
const resultsController = require('./controllers/results')
const searchController = require('./controllers/search')
const datareportController = require('./controllers/datareport')
const problemreportController = require('./controllers/problemreport')

// Add your routes here

// Authentication middleware
const checkIsAuthenticated = (req, res, next) => {
  // if (req.session.passport) {
  //   // the signed in user
  //   res.locals.passport = req.session.passport
  //   // the base URL for navigation
  res.locals.baseUrl = `/organisations/${req.params.organisationId}`
  //   res.locals.cycleId = req.params.cycleId
    next()
  // } else {
  //   delete req.session.data
  //   res.redirect('/sign-in')
  // }
}

/// ------------------------------------------------------------------------ ///
/// ALL ROUTES
/// ------------------------------------------------------------------------ ///

router.all('*', (req, res, next) => {
  res.locals.referrer = req.query.referrer
  res.locals.query = req.query
  res.locals.flash = req.flash('success') // pass through 'success' messages only
  next()
})

/// ------------------------------------------------------------------------ ///
/// PLACEMENT ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/organisations/:organisationId/placements/new/subject-level', checkIsAuthenticated, placementController.new_placement_subject_level_get)
router.post('/organisations/:organisationId/placements/new/subject-level', checkIsAuthenticated, placementController.new_placement_subject_level_post)

router.get('/organisations/:organisationId/placements/new/subject', checkIsAuthenticated, placementController.new_placement_subject_get)
router.post('/organisations/:organisationId/placements/new/subject', checkIsAuthenticated, placementController.new_placement_subject_post)

router.get('/organisations/:organisationId/placements/new/age-range', checkIsAuthenticated, placementController.new_placement_age_range_get)
router.post('/organisations/:organisationId/placements/new/age-range', checkIsAuthenticated, placementController.new_placement_age_range_post)

router.get('/organisations/:organisationId/placements/new/key-stage', checkIsAuthenticated, placementController.new_placement_key_stage_get)
router.post('/organisations/:organisationId/placements/new/key-stage', checkIsAuthenticated, placementController.new_placement_key_stage_post)

router.get('/organisations/:organisationId/placements/new/class-size', checkIsAuthenticated, placementController.new_placement_class_size_get)
router.post('/organisations/:organisationId/placements/new/class-size', checkIsAuthenticated, placementController.new_placement_class_size_post)

router.get('/organisations/:organisationId/placements/new/training-pattern', checkIsAuthenticated, placementController.new_placement_training_pattern_get)
router.post('/organisations/:organisationId/placements/new/training-pattern', checkIsAuthenticated, placementController.new_placement_training_pattern_post)

router.get('/organisations/:organisationId/placements/new/mentor', checkIsAuthenticated, placementController.new_placement_mentor_get)
router.post('/organisations/:organisationId/placements/new/mentor', checkIsAuthenticated, placementController.new_placement_mentor_post)

router.get('/organisations/:organisationId/placements/new/mentor-availability', checkIsAuthenticated, placementController.new_placement_mentor_availability_get)
router.post('/organisations/:organisationId/placements/new/mentor-availability', checkIsAuthenticated, placementController.new_placement_mentor_availability_post)

router.get('/organisations/:organisationId/placements/new/check-your-answers', checkIsAuthenticated, placementController.new_placement_check_get)
router.post('/organisations/:organisationId/placements/new/check-your-answers', checkIsAuthenticated, placementController.new_placement_check_post)


router.get('/organisations/:organisationId/placements/:placementId/subject', checkIsAuthenticated, placementController.edit_placement_subject_get)
router.post('/organisations/:organisationId/placements/:placementId/subject', checkIsAuthenticated, placementController.edit_placement_subject_post)

router.get('/organisations/:organisationId/placements/:placementId/age-range', checkIsAuthenticated, placementController.edit_placement_age_range_get)
router.post('/organisations/:organisationId/placements/:placementId/age-range', checkIsAuthenticated, placementController.edit_placement_age_range_post)

router.get('/organisations/:organisationId/placements/:placementId/key-stage', checkIsAuthenticated, placementController.edit_placement_key_stage_get)
router.post('/organisations/:organisationId/placements/:placementId/key-stage', checkIsAuthenticated, placementController.edit_placement_key_stage_post)

router.get('/organisations/:organisationId/placements/:placementId/class-size', checkIsAuthenticated, placementController.edit_placement_class_size_get)
router.post('/organisations/:organisationId/placements/:placementId/class-size', checkIsAuthenticated, placementController.edit_placement_class_size_post)

router.get('/organisations/:organisationId/placements/:placementId/training-pattern', checkIsAuthenticated, placementController.edit_placement_training_pattern_get)
router.post('/organisations/:organisationId/placements/:placementId/training-pattern', checkIsAuthenticated, placementController.edit_placement_training_pattern_post)

router.get('/organisations/:organisationId/placements/:placementId/mentor', checkIsAuthenticated, placementController.edit_placement_mentor_get)
router.post('/organisations/:organisationId/placements/:placementId/mentor', checkIsAuthenticated, placementController.edit_placement_mentor_post)

router.get('/organisations/:organisationId/placements/:placementId/mentor-availability', checkIsAuthenticated, placementController.edit_placement_mentor_availability_get)
router.post('/organisations/:organisationId/placements/:placementId/mentor-availability', checkIsAuthenticated, placementController.edit_placement_mentor_availability_post)

router.get('/organisations/:organisationId/placements/:placementId/delete', checkIsAuthenticated, placementController.delete_placement_get)
router.post('/organisations/:organisationId/placements/:placementId/delete', checkIsAuthenticated, placementController.delete_placement_post)

router.get('/organisations/:organisationId/placements/:placementId', checkIsAuthenticated, placementController.show_placement_get)

router.get('/organisations/:organisationId/placements', checkIsAuthenticated, placementController.list_placements_get)


/// ------------------------------------------------------------------------ ///
/// ORGANISATION ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/organisations/:organisationId', checkIsAuthenticated, organisationController.show_organisation_get)


/// ------------------------------------------------------------------------ ///
/// SEARCH ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/search', searchController.search_get)
router.post('/search', searchController.search_post)

router.get('/age-groups', searchController.age_groups_get)
router.post('/age-groups', searchController.age_groups_post)

router.get('/primary-subjects', searchController.primary_subjects_get)
router.post('/primary-subjects', searchController.primary_subjects_post)

router.get('/secondary-subjects', searchController.secondary_subjects_get)
router.post('/secondary-subjects', searchController.secondary_subjects_post)

/// ------------------------------------------------------------------------ ///
/// AUTOCOMPLETE ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/location-suggestions', searchController.location_suggestions_json)

router.get('/school-suggestions', searchController.school_suggestions_json)

/// ------------------------------------------------------------------------ ///
/// RESULTS ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/results', resultsController.list)

router.get('/results/remove-keyword-search', resultsController.removeKeywordSearch)

router.get('/results/remove-a-filter/:a', resultsController.removeFilterA)
router.get('/results/remove-b-filter/:b', resultsController.removeFilterB)
router.get('/results/remove-c-filter/:c', resultsController.removeFilterC)

router.get('/results/remove-all-filters', resultsController.removeAllFilters)

router.get('/placements/:placementId', resultsController.show)


/// ------------------------------------------------------------------------ ///
/// DATA REPORT ROUTES
/// ------------------------------------------------------------------------ ///
router.get('/datareport', datareportController.datareport_get)
router.get('/datareport/template', datareportController.template_get)
router.get('/datareport/biggestchallenge', datareportController.biggestchallenge_get)

/// ------------------------------------------------------------------------ ///
/// REPORT PROBLEM ROUTES
/// ------------------------------------------------------------------------ ///
router.get('/problemreport', problemreportController.problemreport_get)
