import 'jasmine';
import * as assert from 'assert';
import {sortKeys, sortResource} from '../src/utils';

describe('sortResource', function () {
  let resource: any;

  it('should sort empty object', function () {
    resource = {};

    assert.strictEqual(resource, sortResource(resource));

    assert.deepEqual({}, resource);
  });

  ['methods', 'resources'].forEach(function (property) {
    it(`should sort ${property}`, function () {
      resource = {
        [property]: {
          C: 'C',
          B: 'B',
          A: 'A',
        },
      };

      assert.strictEqual(resource, sortResource(resource));

      assert.deepEqual(['A', 'B', 'C'], Object.keys(resource[property]));
      assert.deepEqual(['A', 'B', 'C'], Object.values(resource[property]));
    });
  });

  it('should sort nested resources', function () {
    resource = {
      resources: {
        B: 'B',
        C: 'C',
        A: {
          methods: {
            A2: 'A2',
            A1: 'A1',
          },
          resources: {
            AB: 'AB',
            AC: {
              methods: {
                AC2: 'AC2',
                AC1: 'AC1',
              },
            },
            AA: 'AA',
          },
        },
      },
    };

    sortResource(resource);

    assert.deepEqual(['A', 'B', 'C'], Object.keys(resource.resources));
    assert.deepEqual(['A1', 'A2'], Object.keys(resource.resources.A.methods));
    assert.deepEqual(['AA', 'AB', 'AC'], Object.keys(resource.resources.A.resources));
    assert.deepEqual(['AC1', 'AC2'], Object.keys(resource.resources.A.resources.AC.methods));
  });
});

describe('sortKeys', function () {
  it('should sort keys', function () {
    const sorted = sortKeys({
      C: 'C',
      B: 'B',
      A: 'A',
    });

    assert.deepEqual(['A', 'B', 'C'], Object.keys(sorted));
    assert.deepEqual(['A', 'B', 'C'], Object.values(sorted));
  });
});
