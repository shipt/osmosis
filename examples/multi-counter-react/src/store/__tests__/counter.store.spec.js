import React, { useContext } from 'react';
import { CounterStore, GlobalCounterStore } from '../counter.store';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('CounterStore', () => {
  let store;
  const renderStore = () => {
    const Dummy = () => {
      store = useContext(CounterStore.Context);
      return null;
    };
    const Prep = () => (
      <GlobalCounterStore.Provider>
        <CounterStore.Provider name="Test">
          <Dummy name="Test" />
        </CounterStore.Provider>
      </GlobalCounterStore.Provider>
    );
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
