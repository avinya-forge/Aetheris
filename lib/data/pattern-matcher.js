function matchHistoricalPattern(prediction) {
  return !!prediction.patternMatchId && prediction.speculative !== true;
}

module.exports = { matchHistoricalPattern };
