const { matchHistoricalPattern } = require('./pattern-matcher.js');

function filterSpeculativePredictions(predictions) {
  return predictions.filter(prediction => matchHistoricalPattern(prediction));
}

module.exports = { filterSpeculativePredictions };
