import assert from 'assert';
import { getSynthesis } from '../src/lib/synthesis-service';

try {
  const result = getSynthesis('c1');
  assert.strictEqual(result.id, 'c1', 'Should return correct cluster ID');
  assert.ok(result.brief.length <= 180, 'Brief should be concise');
  assert.ok(result.wordCount > 0, 'Should have a positive word count');

  console.log('PASS - synthesis-service.test.js');
} catch (e: any) {
  console.error('synthesis-service.test.js failed:', e.message);
  process.exit(1);
}

export {};
