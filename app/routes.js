//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Controller modules
const placementController = require('./controllers/placements')


// Add your routes here

// Authentication middleware
const checkIsAuthenticated = (req, res, next) => {
  // if (req.session.passport) {
  //   // the signed in user
  //   res.locals.passport = req.session.passport
  //   // the base URL for navigation
  //   res.locals.baseUrl = `/organisations/${req.params.organisationId}/cycles/${req.params.cycleId}`
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
  // res.locals.flash = req.flash('success') // pass through 'success' messages only
  next()
})

/// ------------------------------------------------------------------------ ///
/// PLACEMENT ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/placements/new/subject-level', checkIsAuthenticated, placementController.new_placement_subject_level_get)
router.post('/placements/new/subject-level', checkIsAuthenticated, placementController.new_placement_subject_level_post)

router.get('/placements/new/subject', checkIsAuthenticated, placementController.new_placement_subject_get)
router.post('/placements/new/subject', checkIsAuthenticated, placementController.new_placement_subject_post)

router.get('/placements/new/age-range', checkIsAuthenticated, placementController.new_placement_age_range_get)
router.post('/placements/new/age-range', checkIsAuthenticated, placementController.new_placement_age_range_post)

router.get('/placements/new/class-size', checkIsAuthenticated, placementController.new_placement_class_size_get)
router.post('/placements/new/class-size', checkIsAuthenticated, placementController.new_placement_class_size_post)

router.get('/placements/new/training-pattern', checkIsAuthenticated, placementController.new_placement_training_pattern_get)
router.post('/placements/new/training-pattern', checkIsAuthenticated, placementController.new_placement_training_pattern_post)

router.get('/placements/new/check-your-answers', checkIsAuthenticated, placementController.new_placement_check_get)
router.post('/placements/new/check-your-answers', checkIsAuthenticated, placementController.new_placement_check_post)


router.get('/placements/:placementId/subject', checkIsAuthenticated, placementController.edit_placement_subject_get)
router.post('/placements/:placementId/subject', checkIsAuthenticated, placementController.edit_placement_subject_post)

router.get('/placements/:placementId/age-range', checkIsAuthenticated, placementController.edit_placement_age_range_get)
router.post('/placements/:placementId/age-range', checkIsAuthenticated, placementController.edit_placement_age_range_post)

router.get('/placements/:placementId/class-size', checkIsAuthenticated, placementController.edit_placement_class_size_get)
router.post('/placements/:placementId/class-size', checkIsAuthenticated, placementController.edit_placement_class_size_post)

router.get('/placements/:placementId/training-pattern', checkIsAuthenticated, placementController.edit_placement_training_pattern_get)
router.post('/placements/:placementId/training-pattern', checkIsAuthenticated, placementController.edit_placement_training_pattern_post)


router.get('/placements/:placementId', checkIsAuthenticated, placementController.show_placement_get)

router.get('/placements', checkIsAuthenticated, placementController.list_placements_get)
