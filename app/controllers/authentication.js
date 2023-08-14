const settings = require('../data/settings')

exports.sign_in_get = (req, res) => {
  if (req.session.passport) {
    res.redirect('/')
  } else {
    const errors = req.flash()
    res.render('../views/auth/index', {
      useLogin: process.env.USE_LOGIN || settings.useLogin,
      actions: {
        save: '/sign-in',
        create: '/register',
        terms: '/terms-and-conditions',
        forgotten: '/forgotten-password'
      },
      errors
    })
  }
}

exports.auth_get = (req, res) => {
  delete req.session.data.username
  delete req.session.data.password
  res.redirect('/organisations')
}

exports.sign_out_get = (req, res) => {
  delete req.session.data
  delete req.session.passport
  req.flash('success', 'Signed out')
  res.redirect('/sign-in')
}

exports.register_get = (req, res) => {
  res.render('../views/auth/register', {
    actions: {
      save: '/register',
      back: '/',
      signin: '/',
      terms: '/terms-and-conditions'
    }
  })
}

exports.register_post = (req, res) => {
  const errors = []

  if (!req.session.data.firstname.length) {
    const error = {}
    error.fieldName = 'firstname'
    error.href = '#firstname'
    error.text = 'Enter a first name'
    errors.push(error)
  }

  if (!req.session.data.lastname.length) {
    const error = {}
    error.fieldName = 'lastname'
    error.href = '#lastname'
    error.text = 'Enter a last name'
    errors.push(error)
  }

  if (!req.session.data.email.length) {
    const error = {}
    error.fieldName = 'email'
    error.href = '#email'
    error.text = 'Enter an email address'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/auth/register', {
      actions: {
        save: '/register',
        back: '/',
        signin: '/',
        terms: '/terms-and-conditions'
      },
      errors
    })
  } else {
    req.flash('success', {
      title: 'Verification email sent',
      description: 'A verification email has been sent to ' + req.session.data.email
    })

    res.redirect('/confirm-email')
  }
}

exports.confirm_email_get = (req, res) => {
  res.render('../views/auth/confirm-email', {
    actions: {
      save: '/confirm-email',
      back: '/register',
      resend: '/resend-code'
    }
  })
}

exports.confirm_email_post = (req, res) => {
  const errors = []

  if (!req.session.data.code.length) {
    const error = {}
    error.fieldName = 'code'
    error.href = '#code'
    error.text = 'Enter a verification code'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/auth/confirm-email', {
      actions: {
        save: '/confirm-email',
        back: '/register',
        resend: '/resend-code'
      },
      errors
    })
  } else {
    res.redirect('/registration-complete')
  }
}

exports.resend_code_get = (req, res) => {
  res.render('../views/auth/resend-code', {
    actions: {
      save: '/resend-code',
      back: '/confirm-email'
    }
  })
}

exports.resend_code_post = (req, res) => {
  const errors = []

  if (!req.session.data.email.length) {
    const error = {}
    error.fieldName = 'email'
    error.href = '#email'
    error.text = 'Enter an email address'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/auth/resend-code', {
      actions: {
        save: '/resend-code',
        back: '/confirm-email'
      },
      errors
    })
  } else {
    res.redirect('/confirm-email')
  }
}

exports.forgotten_password_get = (req, res) => {
  res.render('../views/auth/forgotten-password', {
    actions: {
      save: '/forgotten-password',
      back: '/'
    }
  })
}

exports.forgotten_password_post = (req, res) => {
  const errors = []

  if (!req.session.data.email.length) {
    const error = {}
    error.fieldName = 'email'
    error.href = '#email'
    error.text = 'Enter an email address'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/auth/forgotten-password', {
      actions: {
        save: '/forgotten-password',
        back: '/'
      },
      errors
    })
  } else {
    req.flash('success', {
      title: 'Verification email sent',
      description: 'A verification email has been sent to ' + req.session.data.email
    })

    res.redirect('/verification-code')
  }
}

exports.verification_code_get = (req, res) => {
  res.render('../views/auth/verification-code', {
    actions: {
      save: '/verification-code',
      back: '/'
    }
  })
}

exports.verification_code_post = (req, res) => {
  const errors = []

  if (!req.session.data.code.length) {
    const error = {}
    error.fieldName = 'code'
    error.href = '#code'
    error.text = 'Enter your verification code'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/auth/verification-code', {
      actions: {
        save: '/verification-code',
        back: '/'
      },
      errors
    })
  } else {
    res.redirect('/create-password')
  }
}

exports.create_password_get = (req, res) => {
  res.render('../views/auth/create-password', {
    actions: {
      save: '/create-password',
      back: '/'
    }
  })
}

exports.create_password_post = (req, res) => {
  const errors = []

  if (!req.session.data.password.length) {
    const error = {}
    error.fieldName = 'password'
    error.href = '#password'
    error.text = 'Enter a new password'
    errors.push(error)
  } else if (req.session.data.password.length < 12) {
    const error = {}
    error.fieldName = 'password'
    error.href = '#password'
    error.text = 'Enter a password at least 12 characters long'
    errors.push(error)
  }

  if (!req.session.data.confirmPassword.length) {
    const error = {}
    error.fieldName = 'confirmPassword'
    error.href = '#confirmPassword'
    error.text = 'Enter a password confirmation'
    errors.push(error)
  } else if (!(req.session.data.confirmPassword == req.session.data.password)) {
    const error = {}
    error.fieldName = 'confirmPassword'
    error.href = '#confirmPassword'
    error.text = 'Password confirmation does not match the password'
    errors.push(error)
  }

  if (errors.length) {
    res.render('../views/auth/create-password', {
      actions: {
        save: '/create-password',
        back: '/'
      },
      errors
    })
  } else {
    res.redirect('/password-reset')
  }
}

exports.password_reset_get = (req, res) => {
  res.render('../views/auth/password-reset', {
    actions: {
      next: '/'
    }
  })
}

exports.password_reset_post = (req, res) => {

}

exports.terms_and_conditions_get = (req, res) => {
  res.render('../views/auth/terms', {
    actions: {
      back: req.headers.referer
    }
  })
}

exports.registration_complete_get = (req, res) => {
  res.render('../views/auth/registration-complete', {
    actions: {
      next: '/'
    }
  })
}
