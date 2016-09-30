/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 */

import type {GenericTypeAnnotation} from 'ast-types-flow';
import type {Lines, Print} from '../../types/common';

import flatten from '../../utils/flatten';
import markers from '../../constants/markers';

function printGenericTypeAnnotation(
  print: Print,
  node: GenericTypeAnnotation,
): Lines {
  return flatten([
    print(node.id),
    node.typeParameters ? print(node.typeParameters) : markers.empty,
  ]);
}

module.exports = printGenericTypeAnnotation;
