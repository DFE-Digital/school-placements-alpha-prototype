//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const settings = require('./data/settings')

/// ------------------------------------------------------------------------ ///
/// Flash messaging
/// ------------------------------------------------------------------------ ///
const flash = require('connect-flash')
router.use(flash())

/// ------------------------------------------------------------------------ ///
/// User authentication
/// ------------------------------------------------------------------------ ///
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const authenticationModel = require('./models/authentication')

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

// Authentication
passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = authenticationModel.findOne({
      username: username,
      password: password,
      active: true
    })
    if (user) { return done(null, user) }
    return done(null, false)
  }
))

router.use(passport.initialize())
router.use(passport.session())

// Controller modules
const accountController = require('./controllers/account')
const authenticationController = require('./controllers/authentication')
const mentorController = require('./controllers/mentors')
const mentorSearchController = require('./controllers/mentor-search')
const organisationController = require('./controllers/organisations')
const placementController = require('./controllers/placements')
const resultsController = require('./controllers/results')
const searchController = require('./controllers/search')
const dataReportController = require('./controllers/data-report')
const userController = require('./controllers/users')
const guidanceController = require('./controllers/guidance')
const contentController = require('./controllers/content')

const dataController = require('./controllers/data')

// Add your routes here

// Authentication middleware
const checkIsAuthenticated = (req, res, next) => {
  if (req.session.passport) {
    // the signed in user
    res.locals.passport = req.session.passport
    // the base URL for navigation
    res.locals.baseUrl = `/organisations/${req.params.organisationId}`
    next()
  } else {
    delete req.session.data
    res.redirect('/sign-in')
  }
}

/// ------------------------------------------------------------------------ ///
/// ALL ROUTES
/// ------------------------------------------------------------------------ ///

router.all('*', (req, res, next) => {
  res.locals.settings = settings
  res.locals.referrer = req.query.referrer
  res.locals.query = req.query
  res.locals.flash = req.flash('success') // pass through 'success' messages only
  next()
})

/// ------------------------------------------------------------------------ ///
/// AUTHENTICATION ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/sign-in', authenticationController.sign_in_get)
router.post('/sign-in', passport.authenticate('local', {
  successRedirect: '/auth',
  failureRedirect: '/sign-in',
  failureFlash: 'Enter valid sign-in details'
}))

router.get('/auth', authenticationController.auth_get)

router.get('/sign-out', authenticationController.sign_out_get)

router.get('/register', authenticationController.register_get)
router.post('/register', authenticationController.register_post)

router.get('/confirm-email', authenticationController.confirm_email_get)
router.post('/confirm-email', authenticationController.confirm_email_post)

router.get('/resend-code', authenticationController.resend_code_get)
router.post('/resend-code', authenticationController.resend_code_post)

router.get('/forgotten-password', authenticationController.forgotten_password_get)
router.post('/forgotten-password', authenticationController.forgotten_password_post)

router.get('/verification-code', authenticationController.verification_code_get)
router.post('/verification-code', authenticationController.verification_code_post)

router.get('/create-password', authenticationController.create_password_get)
router.post('/create-password', authenticationController.create_password_post)

router.get('/password-reset', authenticationController.password_reset_get)
router.post('/password-reset', authenticationController.password_reset_post)

router.get('/registration-complete', authenticationController.registration_complete_get)

router.get('/terms-and-conditions', authenticationController.terms_and_conditions_get)

/// ------------------------------------------------------------------------ ///
/// YOUR ACCOUNT ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/account', checkIsAuthenticated, accountController.user_account)

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
/// MENTOR SEARCH ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/find/organisations/:organisationId/mentors/search', checkIsAuthenticated, mentorSearchController.search_get)
router.post('/find/organisations/:organisationId/mentors/search', checkIsAuthenticated, mentorSearchController.search_post)

router.get('/find/organisations/:organisationId/mentors/age-groups', checkIsAuthenticated, mentorSearchController.age_groups_get)
router.post('/find/organisations/:organisationId/mentors/age-groups', checkIsAuthenticated, mentorSearchController.age_groups_post)

router.get('/find/organisations/:organisationId/mentors/primary-subjects', checkIsAuthenticated, mentorSearchController.primary_subjects_get)
router.post('/find/organisations/:organisationId/mentors/primary-subjects', checkIsAuthenticated, mentorSearchController.primary_subjects_post)

router.get('/find/organisations/:organisationId/mentors/secondary-subjects', checkIsAuthenticated, mentorSearchController.secondary_subjects_get)
router.post('/find/organisations/:organisationId/mentors/secondary-subjects', checkIsAuthenticated, mentorSearchController.secondary_subjects_post)

router.get('/find/organisations/:organisationId/mentors/results', checkIsAuthenticated, mentorSearchController.list_mentors_results_get)

router.get('/find/organisations/:organisationId/mentors/remove-keyword-search', checkIsAuthenticated, mentorSearchController.removeKeywordSearch)

router.get('/find/organisations/:organisationId/mentors/remove-a-filter/:a', checkIsAuthenticated, mentorSearchController.removeFilterA)
router.get('/find/organisations/:organisationId/mentors/remove-b-filter/:b', checkIsAuthenticated, mentorSearchController.removeFilterB)
router.get('/find/organisations/:organisationId/mentors/remove-c-filter/:c', checkIsAuthenticated, mentorSearchController.removeFilterC)
router.get('/find/organisations/:organisationId/mentors/remove-d-filter/:d', checkIsAuthenticated, mentorSearchController.removeFilterD)
router.get('/find/organisations/:organisationId/mentors/remove-e-filter/:e', checkIsAuthenticated, mentorSearchController.removeFilterE)
router.get('/find/organisations/:organisationId/mentors/remove-f-filter/:f', checkIsAuthenticated, mentorSearchController.removeFilterF)
router.get('/find/organisations/:organisationId/mentors/remove-g-filter/:g', checkIsAuthenticated, mentorSearchController.removeFilterG)
router.get('/find/organisations/:organisationId/mentors/remove-h-filter/:h', checkIsAuthenticated, mentorSearchController.removeFilterH)
router.get('/find/organisations/:organisationId/mentors/remove-i-filter/:i', checkIsAuthenticated, mentorSearchController.removeFilterI)
router.get('/find/organisations/:organisationId/mentors/remove-j-filter/:j', checkIsAuthenticated, mentorSearchController.removeFilterJ)

router.get('/find/organisations/:organisationId/mentors/remove-all-filters', checkIsAuthenticated, mentorSearchController.removeAllFilters)

router.get('/find/organisations/:organisationId/mentors/:mentorId', checkIsAuthenticated, mentorSearchController.show_mentor_get)

router.get('/find/organisations/:organisationId/mentors', checkIsAuthenticated, mentorSearchController.list_mentors_get)

/// ------------------------------------------------------------------------ ///
/// MENTOR ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/organisations/:organisationId/mentors/new', checkIsAuthenticated, mentorController.new_mentor_get)
router.post('/organisations/:organisationId/mentors/new', checkIsAuthenticated, mentorController.new_mentor_post)

router.get('/organisations/:organisationId/mentors/new/subject', checkIsAuthenticated, mentorController.new_mentor_subject_get)
router.post('/organisations/:organisationId/mentors/new/subject', checkIsAuthenticated, mentorController.new_mentor_subject_post)

router.get('/organisations/:organisationId/mentors/new/age-range', checkIsAuthenticated, mentorController.new_mentor_age_range_get)
router.post('/organisations/:organisationId/mentors/new/age-range', checkIsAuthenticated, mentorController.new_mentor_age_range_post)

router.get('/organisations/:organisationId/mentors/new/key-stage', checkIsAuthenticated, mentorController.new_mentor_key_stage_get)
router.post('/organisations/:organisationId/mentors/new/key-stage', checkIsAuthenticated, mentorController.new_mentor_key_stage_post)

router.get('/organisations/:organisationId/mentors/new/check', checkIsAuthenticated, mentorController.new_mentor_check_get)
router.post('/organisations/:organisationId/mentors/new/check', checkIsAuthenticated, mentorController.new_mentor_check_post)

router.get('/organisations/:organisationId/mentors/:mentorId/edit', checkIsAuthenticated, mentorController.edit_mentor_get)
router.post('/organisations/:organisationId/mentors/:mentorId/edit', checkIsAuthenticated, mentorController.edit_mentor_post)

router.get('/organisations/:organisationId/mentors/:mentorId/subject', checkIsAuthenticated, mentorController.edit_mentor_subject_get)
router.post('/organisations/:organisationId/mentors/:mentorId/subject', checkIsAuthenticated, mentorController.edit_mentor_subject_post)

router.get('/organisations/:organisationId/mentors/:mentorId/age-range', checkIsAuthenticated, mentorController.edit_mentor_age_range_get)
router.post('/organisations/:organisationId/mentors/:mentorId/age-range', checkIsAuthenticated, mentorController.edit_mentor_age_range_post)

router.get('/organisations/:organisationId/mentors/:mentorId/key-stage', checkIsAuthenticated, mentorController.edit_mentor_key_stage_get)
router.post('/organisations/:organisationId/mentors/:mentorId/key-stage', checkIsAuthenticated, mentorController.edit_mentor_key_stage_post)

router.get('/organisations/:organisationId/mentors/:mentorId/send-training', checkIsAuthenticated, mentorController.edit_mentor_send_training_get)
router.post('/organisations/:organisationId/mentors/:mentorId/send-training', checkIsAuthenticated, mentorController.edit_mentor_send_training_post)

router.get('/organisations/:organisationId/mentors/:mentorId/networks-and-associations', checkIsAuthenticated, mentorController.edit_mentor_networks_associations_get)
router.post('/organisations/:organisationId/mentors/:mentorId/networks-and-associations', checkIsAuthenticated, mentorController.edit_mentor_networks_associations_post)

router.get('/organisations/:organisationId/mentors/:mentorId/other-experiences', checkIsAuthenticated, mentorController.edit_mentor_other_experiences_get)
router.post('/organisations/:organisationId/mentors/:mentorId/other-experiences', checkIsAuthenticated, mentorController.edit_mentor_other_experiences_post)

router.get('/organisations/:organisationId/mentors/:mentorId/delete', checkIsAuthenticated, mentorController.delete_mentor_get)
router.post('/organisations/:organisationId/mentors/:mentorId/delete', checkIsAuthenticated, mentorController.delete_mentor_post)

router.get('/organisations/:organisationId/mentors/:mentorId/description', checkIsAuthenticated, mentorController.show_mentor_additional_details_get)

router.get('/organisations/:organisationId/mentors/:mentorId', checkIsAuthenticated, mentorController.show_mentor_details_get)

router.get('/organisations/:organisationId/mentors', checkIsAuthenticated, mentorController.list_mentors_get)

/// ------------------------------------------------------------------------ ///
/// ORGANISATION ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/organisations/:organisationId/show', checkIsAuthenticated, organisationController.show_organisation_get)

router.get('/organisations/:organisationId/establishment-group', checkIsAuthenticated, organisationController.edit_establishment_group_get)
router.post('/organisations/:organisationId/establishment-group', checkIsAuthenticated, organisationController.edit_establishment_group_post)

router.get('/organisations/:organisationId/establishment-type', checkIsAuthenticated, organisationController.edit_establishment_type_get)
router.post('/organisations/:organisationId/establishment-type', checkIsAuthenticated, organisationController.edit_establishment_type_post)

router.get('/organisations/:organisationId/establishment-phase', checkIsAuthenticated, organisationController.edit_establishment_phase_get)
router.post('/organisations/:organisationId/establishment-phase', checkIsAuthenticated, organisationController.edit_establishment_phase_post)

router.get('/organisations/:organisationId/gender', checkIsAuthenticated, organisationController.edit_gender_get)
router.post('/organisations/:organisationId/gender', checkIsAuthenticated, organisationController.edit_gender_post)

router.get('/organisations/:organisationId/age', checkIsAuthenticated, organisationController.edit_age_get)
router.post('/organisations/:organisationId/age', checkIsAuthenticated, organisationController.edit_age_post)

router.get('/organisations/:organisationId/sixth-form', checkIsAuthenticated, organisationController.edit_sixth_form_get)
router.post('/organisations/:organisationId/sixth-form', checkIsAuthenticated, organisationController.edit_sixth_form_post)

router.get('/organisations/:organisationId/nursery-provision', checkIsAuthenticated, organisationController.edit_nursery_provision_get)
router.post('/organisations/:organisationId/nursery-provision', checkIsAuthenticated, organisationController.edit_nursery_provision_post)

router.get('/organisations/:organisationId/religious-character', checkIsAuthenticated, organisationController.edit_religious_character_get)
router.post('/organisations/:organisationId/religious-character', checkIsAuthenticated, organisationController.edit_religious_character_post)

router.get('/organisations/:organisationId/admissions-policy', checkIsAuthenticated, organisationController.edit_admissions_policy_get)
router.post('/organisations/:organisationId/admissions-policy', checkIsAuthenticated, organisationController.edit_admissions_policy_post)

router.get('/organisations/:organisationId/urban-rural', checkIsAuthenticated, organisationController.edit_urban_rural_get)
router.post('/organisations/:organisationId/urban-rural', checkIsAuthenticated, organisationController.edit_urban_rural_post)

router.get('/organisations/:organisationId/school-capacity', checkIsAuthenticated, organisationController.edit_school_capacity_get)
router.post('/organisations/:organisationId/school-capacity', checkIsAuthenticated, organisationController.edit_school_capacity_post)

router.get('/organisations/:organisationId/free-school-meals', checkIsAuthenticated, organisationController.edit_free_school_meals_get)
router.post('/organisations/:organisationId/free-school-meals', checkIsAuthenticated, organisationController.edit_free_school_meals_post)

router.get('/organisations/:organisationId/special-classes', checkIsAuthenticated, organisationController.edit_special_classes_get)
router.post('/organisations/:organisationId/special-classes', checkIsAuthenticated, organisationController.edit_special_classes_post)

router.get('/organisations/:organisationId/send-provision', checkIsAuthenticated, organisationController.edit_send_provision_get)
router.post('/organisations/:organisationId/send-provision', checkIsAuthenticated, organisationController.edit_send_provision_post)

router.get('/organisations/:organisationId/training-with-disabilities', checkIsAuthenticated, organisationController.edit_training_with_disabilities_get)
router.post('/organisations/:organisationId/training-with-disabilities', checkIsAuthenticated, organisationController.edit_training_with_disabilities_post)

router.get('/organisations/:organisationId', checkIsAuthenticated, organisationController.organisation)

router.get('/organisations', checkIsAuthenticated, organisationController.list_organisations_get)

router.get('/', checkIsAuthenticated, (req, res) => {
  res.redirect('/organisations')
})

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
router.get('/datareport', dataReportController.data_report_get)

router.get('/data-report/shortage-question', dataReportController.shortage_question_get)
router.get('/data-report/shortage-subject', dataReportController.shortage_subject_get)
router.get('/data-report/shortage', dataReportController.shortage_get)

router.get('/data-report/surplus-question', dataReportController.surplus_question_get)
router.get('/data-report/surplus-subject', dataReportController.surplus_subject_get)
router.get('/data-report/surplus', dataReportController.surplus_get)

router.get('/data-report/primary-subjects-difficulty', dataReportController.primary_subjects_difficulty_get)
router.get('/data-report/secondary-subjects-difficulty', dataReportController.secondary_subjects_difficulty_get)

router.get('/data-report/challenges-managing-itt', dataReportController.challenges_managing_itt_get)
router.get('/data-report/reason-not-participate', dataReportController.reason_not_participate_get)

// router.get('/data-report/enough-mentors', dataReportController.enough_mentors_get)

router.get('/data-report/confirmation', dataReportController.confirmation_get)

/// ------------------------------------------------------------------------ ///
/// USER ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/organisations/:organisationId/users/new', checkIsAuthenticated, userController.new_user_get)
router.post('/organisations/:organisationId/users/new', checkIsAuthenticated, userController.new_user_post)

router.get('/organisations/:organisationId/users/new/check', checkIsAuthenticated, userController.new_user_check_get)
router.post('/organisations/:organisationId/users/new/check', checkIsAuthenticated, userController.new_user_check_post)

router.get('/organisations/:organisationId/users/:userId/edit', checkIsAuthenticated, userController.edit_user_get)
router.post('/organisations/:organisationId/users/:userId/edit', checkIsAuthenticated, userController.edit_user_post)

router.get('/organisations/:organisationId/users/:userId/edit/check', checkIsAuthenticated, userController.edit_user_check_get)
router.post('/organisations/:organisationId/users/:userId/edit/check', checkIsAuthenticated, userController.edit_user_check_post)

router.get('/organisations/:organisationId/users/:userId/delete', checkIsAuthenticated, userController.delete_user_get)
router.post('/organisations/:organisationId/users/:userId/delete', checkIsAuthenticated, userController.delete_user_post)

router.get('/organisations/:organisationId/users/:userId', checkIsAuthenticated, userController.user_details)

router.get('/organisations/:organisationId/users', checkIsAuthenticated, userController.user_list)

/// ------------------------------------------------------------------------ ///
/// GUIDANCE ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/guidance/:fileName', guidanceController.guidance)

router.get('/guidance', guidanceController.guidance)

/// ------------------------------------------------------------------------ ///
/// GENERAL ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/accessibility', contentController.accessibility)

router.get('/cookies', contentController.cookies)

router.get('/privacy', contentController.privacy)

router.get('/terms', contentController.terms)

router.get('/', checkIsAuthenticated, (req, res) => {
  res.render('index')
})

/// ------------------------------------------------------------------------ ///
/// DATA ROUTES
/// ------------------------------------------------------------------------ ///
router.get('/data/gias/basic', dataController.gias_basic)
router.get('/data/gias/contrast', dataController.gias_contrast_factors)
router.get('/data/gias/combine', dataController.gias_combine_data)

router.get('/data/providers', dataController.providers)
router.get('/data/lead-schools', dataController.lead_schools)
router.get('/data/schools', dataController.schools)
router.get('/data/mentors', dataController.mentors)
