/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 */

import type {Lines} from '../types/common';

import flatten from './flatten';
import isMarker from './isMarker';

/**
 * This utility unwraps contiguous leading and trailing markers from lines and
 * then inserts pre and post before adding the markers back.
 */
function unwrapMarkers(pre: Lines, lines: Lines, post: Lines): Lines {
  let leading = [];
  for (let i = 0; i < lines.length && isMarker(lines[i]); i++) {
    leading.push(lines[i]);
  }
  let trailing = [];
  for (let i = lines.length - 1; i >= 0 && isMarker(lines[i]); i--) {
    trailing.unshift(lines[i]);
  }
  let middle = [];

  // Everything is a marker... how is that possible?
  if (lines.length === leading.length) {
    leading = [];
    middle = lines;
    trailing = [];
  } else {
    middle = lines.slice(leading.length, lines.length - trailing.length);
  }

  return flatten([
    leading,
    pre,
    middle,
    post,
    trailing,
  ]);
}

module.exports = unwrapMarkers;
