// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';

import { configureUsePersistedState } from '@shipt/osmosis';
configureUsePersistedState({
  getItem: ()=> {},
  setItem: () => {}
});
