'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import markers from '../constants/markers';

/**
 * Given an array of lines this will parse the scopes and return a mapping of
 * line number to unique scope ids. This mapping is returned in the form of an
 * array where arr[lineNumber] is the scopeID.
 */
function buildScopes(lines: Array<any>): Array<?number> {
  const scopes = [];
  let id = 0;
  const stack = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === markers.openScope) {
      stack.push(id++);
    }
    if (stack.length > 0) {
      scopes.push(stack[stack.length - 1]);
    } else {
      scopes.push(null);
    }
    // Make sure to do this after saving in the scope map. The closeScope is
    // part of it's own scope, we don't want to pop too soon.
    if (lines[i] === markers.closeScope) {
      stack.pop();
    }
  }
  return scopes;
}

module.exports = buildScopes;
