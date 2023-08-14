const userModel = require('../models/users')

/// ------------------------------------------------------------------------ ///
/// SHOW USER ACCOUNT
/// ------------------------------------------------------------------------ ///

exports.user_account = (req, res) => {
  const user = userModel.findOne({ userId: req.session.passport.user.id })

  res.render('../views/account/index', {
    user,
    actions: {}
  })
}
