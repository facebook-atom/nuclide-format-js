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
import type {Super} from 'ast-types-flow';

function printSuper(print: Print, node: Super): Lines {
  return ['super'];
}

module.exports = printSuper;
