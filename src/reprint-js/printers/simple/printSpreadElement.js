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
import type {SpreadElement} from 'ast-types-flow';

import flatten from '../../utils/flatten';
import markers from '../../constants/markers';

function printSpreadElement(print: Print, node: SpreadElement): Lines {
  return flatten([
    '...',
    markers.noBreak,
    print(node.argument),
  ]);
}

module.exports = printSpreadElement;
