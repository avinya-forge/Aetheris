function matchHistoricalPattern(prediction) {
  return !!prediction.patternMatchId && prediction.speculative !== true;
}

export { matchHistoricalPattern };

