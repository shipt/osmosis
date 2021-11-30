import React, { useContext } from 'react';
import { CounterStore, GlobalCounterStore } from '../counter.store';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('CounterStore', () => {
  let store;
  const Dummy = () => {
    store = useContext(CounterStore.Context);
    return null;
  };
  const renderStore = () => {
    const Prep = GlobalCounterStore.Provider(CounterStore.Provider(Dummy));
    render(<Prep name="test" />);
  };

  it('tests increment', () => {
    act(() => {
      renderStore();
    });
    expect(store.count).toEqual(0);
    act(() => {
      store.incrementCount();
    });
    expect(store.count).toEqual(1);
  });

  it('tests decrement', () => {
    act(() => {
      renderStore();
    });
    expect(store.count).toEqual(0);
    act(() => {
      store.decrementCount();
    });
    expect(store.count).toEqual(-1);
  });
});
