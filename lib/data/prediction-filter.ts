const { matchHistoricalPattern } = require('./pattern-matcher');

function filterSpeculativePredictions(predictions) {
  return predictions.filter(prediction => matchHistoricalPattern(prediction));
}

module.exports = { filterSpeculativePredictions };

export {};
