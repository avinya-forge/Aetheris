const { matchHistoricalPattern } = require('./pattern-matcher');

function filterSpeculativePredictions(predictions) {
  return predictions.filter(prediction => matchHistoricalPattern(prediction));
}

export { filterSpeculativePredictions };

