exports.getTrainingPatternOptions = (selectedItem) => {
  const items = []
  const trainingPatterns = require('../data/training-patterns')

  trainingPatterns.forEach((trainingPattern, i) => {
    const item = {}

    item.text = trainingPattern.name
    item.value = trainingPattern.code
    item.id = trainingPattern.id
    item.checked = (selectedItem && selectedItem.includes(trainingPattern.code)) ? 'checked' : ''

    items.push(item)
  })

  return items
}

exports.getTrainingPatternLabel = (code) => {
  const trainingPatterns = require('../data/training-patterns')
  const trainingPattern = trainingPatterns.find(trainingPattern => trainingPattern.code === code)

  let label = code

  if (trainingPattern) {
    label = trainingPattern.name
  }

  return label
}
