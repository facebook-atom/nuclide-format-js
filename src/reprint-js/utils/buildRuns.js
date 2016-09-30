/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 */

import isMarker from './isMarker';

/**
 * This returns a list of all the contiguous runs of markers within this set
 * of lines. Runs are [inclusive, exclusive).
 */
function buildRuns(lines: Array<any>): Array<[number, number]> {
  const runs = [];
  let start = null;
  for (let i = 0; i < lines.length; i++) {
    if (!isMarker(lines[i])) {
      if (start != null) {
        runs.push([start, i]);
        start = null;
      }
    } else {
      if (start == null) {
        start = i;
      }
    }
  }
  if (start != null) {
    runs.push([start, lines.length]);
  }
  return runs;
}

module.exports = buildRuns;
