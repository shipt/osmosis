// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';
import { configure as configureTestingLibrary } from '@testing-library/react';
import { configureUsePersistedState } from '@shipt/osmosis';

// https://github.com/testing-library/dom-testing-library/issues/524
configureTestingLibrary({ asyncUtilTimeout: 400 });

configureUsePersistedState({
  getItem: () => {},
  setItem: () => {}
});
