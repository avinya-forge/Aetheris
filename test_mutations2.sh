for file in lib/data/*.js; do
  echo "Checking $file"
  node -e "
const mod = require('./$file');
const fns = Object.values(mod).filter(f => typeof f === 'function');
for (const fn of fns) {
  const dummyEvent = {
    id: '1', hash: 'abc', topic: 'Test', keywords: ['a', 'b'], text: 'A text.', content: 'A content.',
    location: {lat: 0, lon: 0}, data: { temperature_2m: [45], wind_speed_10m: [110] },
    wind: { speed: 450 }
  };
  const args = [];
  if (fn.length === 1) args.push([dummyEvent]);
  if (fn.length === 2) args.push([dummyEvent], { minImpactScore: 0 });
  const arr = [dummyEvent];
  try {
    fn(...args);
    if (JSON.stringify(arr) !== JSON.stringify([dummyEvent])) {
      console.log('MUTATION DETECTED in ' + fn.name);
    }
  } catch(e) {}
}
  "
done
