exports.getEstablishmentTypeOptions = (selectedItem) => {
  const items = []

  let establishmentTypes = require('../data/schools/school-types')

  establishmentTypes.forEach((establishmentType, i) => {
    const item = {}

    item.text = establishmentType.name
    item.value = establishmentType.code
    item.id = establishmentType.id
    item.checked = (selectedItem && selectedItem.includes(establishmentType.code)) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  return items
}

exports.getEstablishmentTypeLabel = (code) => {
  const establishmentTypes = require('../data/schools/school-types')
  const establishmentType = establishmentTypes.find(establishmentType => establishmentType.code === code)

  let label = code

  if (establishmentType) {
    label = establishmentType.name
  }

  return label
}

exports.getEstablishmentGroupOptions = (selectedItem) => {
  const items = []

  let establishmentGroups = require('../data/schools/school-groups')

  establishmentGroups.forEach((establishmentGroup, i) => {
    const item = {}

    item.text = establishmentGroup.name
    item.value = establishmentGroup.code
    item.id = establishmentGroup.id
    item.checked = (selectedItem && selectedItem.includes(establishmentGroup.code)) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  return items
}

exports.getEstablishmentGroupLabel = (code) => {
  const establishmentGroups = require('../data/schools/school-groups')
  const establishmentGroup = establishmentGroups.find(establishmentGroup => establishmentGroup.code === code)

  let label = code

  if (establishmentGroup) {
    label = establishmentGroup.name
  }

  return label
}

exports.getEstablishmentStatusOptions = (selectedItem) => {
  const items = []

  let establishementStatuses = require('../data/schools/school-statuses')

  establishementStatuses.forEach((establishementStatus, i) => {
    const item = {}

    item.text = establishementStatus.name
    item.value = establishementStatus.code
    item.id = establishementStatus.id
    item.checked = (selectedItem && selectedItem.includes(establishementStatus.code)) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  return items
}

exports.getEstablishmentStatusLabel = (code) => {
  const establishementStatuses = require('../data/schools/school-statuses')
  const establishementStatus = establishementStatuses.find(establishementStatus => establishementStatus.code === code)

  let label = code

  if (establishementStatus) {
    label = establishementStatus.name
  }

  return label
}

exports.getEstablishmentPhaseOptions = (selectedItem) => {
  const items = []

  let establishementPhases = require('../data/schools/school-phases')

  establishementPhases.forEach((establishementPhase, i) => {
    const item = {}

    item.text = establishementPhase.name
    item.value = establishementPhase.code
    item.id = establishementPhase.id
    item.checked = (selectedItem && selectedItem.includes(establishementPhase.code)) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  return items
}

exports.getEstablishmentPhaseLabel = (code) => {
  const establishementPhases = require('../data/schools/school-phases')
  const establishementPhase = establishementPhases.find(establishementPhase => establishementPhase.code === code)

  let label = code

  if (establishementPhase) {
    label = establishementPhase.name
  }

  return label
}

exports.getGenderOptions = (selectedItem) => {
  const items = []

  let genders = require('../data/schools/school-genders')

  genders.forEach((gender, i) => {
    const item = {}

    item.text = gender.name
    item.value = gender.code
    item.id = gender.id
    item.checked = (selectedItem && selectedItem.includes(gender.code)) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  return items
}

exports.getGenderLabel = (code) => {
  const genders = require('../data/schools/school-genders')
  const gender = genders.find(gender => gender.code === code)

  let label = code

  if (gender) {
    label = gender.name
  }

  return label
}

exports.getOfficialSixthFormOptions = (selectedItem) => {
  const items = []

  let sixthForms = require('../data/schools/school-sixth-form')

  sixthForms.forEach((sixthForm, i) => {
    const item = {}

    item.text = sixthForm.name
    item.value = sixthForm.code
    item.id = sixthForm.id
    item.checked = (selectedItem && selectedItem.includes(sixthForm.code)) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  return items
}

exports.getOfficialSixthFormLabel = (code) => {
  const sixthForms = require('../data/schools/school-sixth-form')
  const sixthForm = sixthForms.find(sixthForm => sixthForm.code === code)

  let label = code

  if (sixthForm) {
    label = sixthForm.name
  }

  return label
}

exports.getNurseryProvisionOptions = (selectedItem) => {
  const items = []

  let nurseryProvisions = require('../data/schools/school-nursery-provision')

  nurseryProvisions.forEach((nurseryProvision, i) => {
    const item = {}

    item.text = nurseryProvision.name
    item.value = nurseryProvision.code
    item.id = nurseryProvision.id
    item.checked = (selectedItem && selectedItem.includes(nurseryProvision.code)) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  return items
}

exports.getNurseryProvisionLabel = (code) => {
  const nurseryProvisions = require('../data/schools/school-nursery-provision')
  const nurseryProvision = nurseryProvisions.find(nurseryProvision => nurseryProvision.code === code)

  let label = code

  if (nurseryProvision) {
    label = nurseryProvision.name
  }

  return label
}

exports.getReligiousCharacterOptions = (selectedItem) => {
  const items = []

  let religiousCharacters = require('../data/schools/school-religious-character')

  religiousCharacters.forEach((religiousCharacter, i) => {
    const item = {}

    item.text = religiousCharacter.name
    item.value = religiousCharacter.code
    item.id = religiousCharacter.id
    item.checked = (selectedItem && selectedItem.includes(religiousCharacter.code)) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  return items
}

exports.getReligiousCharacterLabel = (code) => {
  const religiousCharacters = require('../data/schools/school-religious-character')
  const religiousCharacter = religiousCharacters.find(religiousCharacter => religiousCharacter.code === code)

  let label = code

  if (religiousCharacter) {
    label = religiousCharacter.name
  }

  return label
}

exports.getAdmissionsPolicyOptions = (selectedItem) => {
  const items = []

  let religiousCharacters = require('../data/schools/school-admissions-policy')

  religiousCharacters.forEach((religiousCharacter, i) => {
    const item = {}

    item.text = religiousCharacter.name
    item.value = religiousCharacter.code
    item.id = religiousCharacter.id
    item.checked = (selectedItem && selectedItem.includes(religiousCharacter.code)) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  return items
}

exports.getAdmissionsPolicyLabel = (code) => {
  const religiousCharacters = require('../data/schools/school-admissions-policy')
  const religiousCharacter = religiousCharacters.find(religiousCharacter => religiousCharacter.code === code)

  let label = code

  if (religiousCharacter) {
    label = religiousCharacter.name
  }

  return label
}

exports.getSpecialClassesOptions = (selectedItem) => {
  const items = []

  let options = require('../data/schools/school-special-classes')

  options.forEach((option, i) => {
    const item = {}

    item.text = option.name
    item.value = option.code
    item.id = option.id
    item.checked = (selectedItem && parseInt(selectedItem) === option.code) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  return items
}

exports.getSpecialClassesLabel = (code) => {
  const options = require('../data/schools/school-special-classes')
  const option = options.find(option => option.code === parseInt(code))

  let label = code

  if (option) {
    label = option.name
  }

  return label
}

exports.getUrbanRuralOptions = (selectedItem) => {
  const items = []

  let options = require('../data/schools/school-urban-rural')

  options.forEach((option, i) => {
    const item = {}

    item.text = option.name
    item.value = option.code
    item.id = option.id
    item.checked = (selectedItem && selectedItem.includes(option.code)) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  return items
}

exports.getUrbanRuralLabel = (code) => {
  const options = require('../data/schools/school-urban-rural')
  const option = options.find(option => option.code === code)

  let label = code

  if (option) {
    label = option.name
  }

  return label
}

exports.getOfstedRatingOptions = (selectedItem) => {
  const items = []

  let options = require('../data/ofsted-ratings')

  options.forEach((option, i) => {
    const item = {}

    item.text = option.name
    item.value = option.code
    item.id = option.id
    item.checked = (selectedItem && selectedItem.includes(option.code)) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  return items
}

exports.getOfstedRatingLabel = (code) => {
  const options = require('../data/ofsted-ratings')
  const option = options.find(option => option.code === code)

  let label = code

  if (option) {
    label = option.name
  }

  return label
}

exports.getSENDProvisionOptions = (selectedItem, noneOption = false) => {
  const items = []

  let options = require('../data/schools/school-send-provision')

  options.sort((a, b) => a.sortOrder - b.sortOrder)

  options.forEach((option, i) => {
    const item = {}

    item.text = option.name
    item.value = option.code
    item.id = option.id
    item.checked = (selectedItem && selectedItem.includes(option.code)) ? 'checked' : ''

    items.push(item)
  })

  if (noneOption) {
    items.push({ divider: 'or' })
    items.push({
      text: 'None',
      value: 'none',
      id: '5df6cb03-028a-4374-8364-20eddbc789c8',
      checked: (selectedItem && selectedItem.includes('none')) ? 'checked' : '',
      behaviour: 'exclusive'
    })
  }

  // items.sort((a, b) => {
  //   return a.text.localeCompare(b.text)
  // })

  return items
}

exports.getSENDProvisionLabel = (code) => {
  const options = require('../data/schools/school-send-provision')
  const option = options.find(option => option.code === code)

  let label = code

  if (option) {
    label = option.name
  }

  return label
}
