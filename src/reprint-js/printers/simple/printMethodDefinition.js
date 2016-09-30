/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 */

import type {Lines, Print} from '../../types/common';
import type {MethodDefinition} from 'ast-types-flow';

import flatten from '../../utils/flatten';
import markers from '../../constants/markers';

function printMethodDefinition(print: Print, node: MethodDefinition): Lines {
  let parts = [];

  if (node.static) {
    parts = parts.concat([
      'static',
      markers.noBreak,
      markers.space,
    ]);
  }

  if (node.kind === 'get') {
    parts = parts.concat([
      'get',
      markers.noBreak,
      markers.space,
    ]);
  } else if (node.kind === 'set') {
    parts = parts.concat([
      'set',
      markers.noBreak,
      markers.space,
    ]);
  }

  if (node.value && node.value.async) {
    // The async part of the method declaration lives below on the function
    // expression.... sad times :(
    parts = parts.concat([
      'async',
      markers.noBreak,
      markers.space,
    ]);
  }

  if (node.value && node.value.generator) {
    parts = parts.concat([
      '*',
      markers.noBreak,
    ]);
  }

  const key = node.kind === 'constructor'
    ? ['constructor']
    : print(node.key);

  if (node.computed) {
    parts = parts.concat([
      '[',
      markers.noBreak,
      key,
      markers.noBreak,
      ']',
      markers.noBreak,
    ]);
  } else {
    parts = parts.concat([
      key,
      markers.noBreak,
    ]);
  }

  parts = parts.concat([
    markers.noBreak,
    print(node.value),
    markers.hardBreak,
  ]);

  return flatten(parts);
}

module.exports = printMethodDefinition;
