import React, { useContext } from 'react';
import { CounterStore, CounterStoreAsIs } from '../counter.store';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('CounterStore', () => {
  let store;
  const renderStore = () => {
    let Prep = CounterStore.Provider(() => {
      store = useContext(CounterStore.Context)[0];
      return null;
    });
    render(<Prep />);
  };

  it('tests increment', () => {
    act(() => {
      renderStore();
    });
    expect(store.state.count).toEqual(0);
    act(() => {
      store.incrementCount();
    });
    expect(store.state.count).toEqual(1);
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
  });
});

describe('CounterStoreAsIs', () => {
  let store;
  const renderStore = () => {
    let Prep = CounterStoreAsIs.Provider(() => {
      store = useContext(CounterStoreAsIs.Context);
      return null;
    });
    render(<Prep />);
  };

  it('tests increment', () => {
    act(() => {
      renderStore();
    });
    expect(store.state.count).toEqual(0);
    act(() => {
      store.incrementCount();
    });
    expect(store.state.count).toEqual(1);
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
  });
});
