// SPDX-License-Identifier: MIT
// Build entry for the npm package: pulls the styles into evecore.css, then re-exports the API.
// Consumers import '@newdoublex/evecore/style.css' themselves.
import './styles/eve.css';
import 'virtual:uno.css';

export * from './index';
export { default } from './index';
