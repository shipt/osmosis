import React from 'react';
import { CounterStore } from '../counter.store';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('CounterStore', () => {
  let store;
  let listener = jest.fn();
  let removeListener;

  const renderStore = () => {
    let Prep = CounterStore.Provider(() => {
      store = CounterStore.useStore();
      return null;
    });
    render(<Prep />);
  };

  beforeEach(() => {
    removeListener = CounterStore.addListener(listener);
  });

  afterEach(() => {
    removeListener();
  });

  it('tests increment', () => {
    act(() => {
      renderStore();
    });
    expect(store.state.count).toEqual(0);
    act(() => {
      store.incrementCount();
    });

    expect(store.state.count).toEqual(1);
    expect(listener).toHaveBeenCalledTimes(2);
    expect(listener).toHaveBeenLastCalledWith(store);
  });

  it('tests decrement', () => {
    act(() => {
      renderStore();
    });
    expect(store.state.count).toEqual(0);
    act(() => {
      store.decrementCount();
    });
    expect(store.state.count).toEqual(-1);
    expect(listener).toHaveBeenCalledTimes(2);
    expect(listener).toHaveBeenLastCalledWith(store);
  });
});
