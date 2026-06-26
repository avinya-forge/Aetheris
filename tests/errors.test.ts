import assert from 'assert';
import { AetherisError, ClientError, MapperError, LogicError, OrchestratorError } from '../lib/errors.js';

try {
  const context = { foo: 'bar' };
  const err = new AetherisError('Base error', context);
  assert.strictEqual(err.message, 'Base error');
  assert.strictEqual(err.name, 'AetherisError');
  assert.deepStrictEqual(err.context, context);

  const clientErr = new ClientError('Client failed');
  assert.ok(clientErr instanceof AetherisError);
  assert.strictEqual(clientErr.name, 'ClientError');

  const mapperErr = new MapperError('Mapper failed');
  assert.ok(mapperErr instanceof AetherisError);
  assert.strictEqual(mapperErr.name, 'MapperError');

  const logicErr = new LogicError('Logic failed');
  assert.ok(logicErr instanceof AetherisError);
  assert.strictEqual(logicErr.name, 'LogicError');

  const orchErr = new OrchestratorError('Orch failed');
  assert.ok(orchErr instanceof AetherisError);
  assert.strictEqual(orchErr.name, 'OrchestratorError');

  console.log('PASS - errors.test.js');
} catch (e: any) {
  console.error('FAIL - errors.test.js:', e.message);
  process.exit(1);
}

export {};
