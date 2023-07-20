exports.getKeyStageOptions = (subjectLevel = 'secondary', selectedItem) => {
  const items = []

  let keyStages = require('../data/key-stages')
  if (subjectLevel) {
    keyStages = keyStages.filter(range => range.level === subjectLevel)
  }

  keyStages.forEach((keyStage, i) => {
    const item = {}

    item.text = keyStage.name
    item.value = keyStage.code
    item.id = keyStage.id
    item.checked = (selectedItem && selectedItem.includes(keyStage.code)) ? 'checked' : ''

    items.push(item)
  })

  items.sort((a, b) => {
    return a.text.localeCompare(b.text)
  })

  return items
}

exports.getKeyStageLabel = (code) => {
  const keyStages = require('../data/key-stages')
  const keyStage = keyStages.find(keyStage => keyStage.code === code)

  let label = code

  if (keyStage) {
    label = keyStage.name
  }

  return label
}
