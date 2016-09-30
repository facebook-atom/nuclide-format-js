/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 */

import type {JSXOpeningElement} from 'ast-types-flow';
import type {Lines, Print} from '../../types/common';

import flatten from '../../utils/flatten';
import markers from '../../constants/markers';

/**
 * Note: A self closing tag gets its own scope, but a non-self closing tag will
 * use the scope opened up in the parent JSXElement.
 */
function printJSXOpeningElement(print: Print, node: JSXOpeningElement): Lines {
  // Easier to completely branch on self closing to handle slightly different
  // styles involved with scope breaks.
  if (node.selfClosing) {
    return flatten([
      '<',
      markers.openScope,
      markers.scopeIndent,
      markers.noBreak,
      print(node.name),
      markers.scopeSpaceBreak,
      node.attributes.map(a => [
        print(a),
        markers.scopeSpaceBreak,
      ]),
      markers.scopeDedent,
      markers.closeScope,
      '/>',
    ]);
  } else {
    return flatten([
      '<',
      markers.noBreak,
      print(node.name),
      node.attributes.map((a, i, arr) => [
        i === 0 ? markers.scopeSpaceBreak : markers.empty,
        print(a),
        i < arr.length - 1 ? markers.scopeSpaceBreak : markers.empty,
      ]),
      '>',
    ]);
  }
}

module.exports = printJSXOpeningElement;
