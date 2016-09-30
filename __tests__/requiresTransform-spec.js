'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import DefaultModuleMap from '../src/common/state/DefaultModuleMap';

import jscodeshift from 'jscodeshift';
import printRoot from '../src/common/utils/printRoot';
import requiresTransform from '../src/common/requires/transform';
import fs from 'fs';
import path from 'path';

const TESTS = [
  'add-array-expressions',
  'add-assignments',
  'add-classes',
  'add-common-aliases',
  'add-constructor-arguments',
  'add-default-params',
  'add-expressions',
  'add-function-calls',
  'add-if-elses',
  'add-jsx-elements',
  'add-loops',
  'add-object-properties',
  'add-object-spreads',
  'add-polymorphic-type-bounds',
  'add-polymorphic-types',
  'add-react-when-using-jsx',
  'add-requires-after-jest',
  'add-requires-after-use-strict',
  'add-returns',
  'add-spread-args',
  'add-switches',
  'add-tagged-template-expressions',
  'add-template-expressions',
  'add-template-identifiers',
  'add-try-catches',
  'add-types',
  'demote-requires',
  'ignore-arbitrary-new-lines',
  'ignore-array-pattern-elements',
  'ignore-comments-with-no-requires',
  'ignore-declared-jsx',
  'ignore-function-params',
  'ignore-nested-object-patterns',
  'ignore-react-when-using-jsx',
  'ignore-requires-in-blocks',
  'ignore-rest-args',
  'keep-header-comments',
  'promote-types',
  'remove-extra-new-lines',
  'remove-nested-object-pattern',
  'remove-shadowed-requires',
  'remove-shadowed-types',
  'remove-unused-array-patterns',
  'remove-unused-requires',
  'remove-unused-types',
  'respect-declaration-kind',
  'sort-import-specifiers',
  'sort-requires',
  'sort-strange-require-expressions',
  'split-multiple-leading-comments',
];

const SOURCE_OPTIONS = {
  moduleMap: DefaultModuleMap,
};

function readFileP(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}

describe('requiresTransform', () => {
  TESTS.forEach(name => {
    it(`should ${name}`, async () => {
      const testPath = path.join(__dirname, 'fixtures/requires/' + name + '.test');
      const expectedPath = path.join(__dirname, 'fixtures/requires/' + name + '.expected');

      const test = await readFileP(testPath);

      const root = jscodeshift(test);
      requiresTransform(root, SOURCE_OPTIONS);
      const actual = printRoot(root);

      const expected = await readFileP(expectedPath);
      expect(actual).toBe(expected);
    });
  });
});
