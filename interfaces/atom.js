/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 */

declare var atom: any;
declare var TextEditor: any;

declare module 'atom' {
  declare module.exports: any;
}

interface IDisposable {
  dispose(): mixed,
}
