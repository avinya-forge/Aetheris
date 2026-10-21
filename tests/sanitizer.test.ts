import assert from 'assert';
import { sanitizeInput } from '../lib/sanitizer.js';

function testSanitizer() {
  // Test 1: Basic string without dangerous characters
  assert.strictEqual(
    sanitizeInput('hello world'),
    'hello world',
    'Should return plain string as-is'
  );

  // Test 2: HTML tags
  assert.strictEqual(
    sanitizeInput('<script>alert("xss")</script>'),
    '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
    'Should escape HTML tags and quotes'
  );

  // Test 3: Ampersand and single quotes
  assert.strictEqual(
    sanitizeInput('foo & bar \'baz\''),
    'foo &amp; bar &#39;baz&#39;',
    'Should escape ampersands and single quotes'
  );

  // Test 4: Mixed dangerous characters
  assert.strictEqual(
    sanitizeInput('<div class="test">Foo & \'Bar\'</div>'),
    '&lt;div class=&quot;test&quot;&gt;Foo &amp; &#39;Bar&#39;&lt;/div&gt;',
    'Should escape all dangerous characters'
  );

  // Test 5: Non-string inputs
  assert.strictEqual(sanitizeInput(null), null, 'Should return null as-is');
  assert.strictEqual(sanitizeInput(undefined), undefined, 'Should return undefined as-is');
  assert.strictEqual(sanitizeInput(123), 123, 'Should return numbers as-is');
  const obj = { key: 'value' };
  assert.strictEqual(sanitizeInput(obj), obj, 'Should return objects as-is');
}

testSanitizer();
console.log('PASS - sanitizer.test.ts');

export {};
