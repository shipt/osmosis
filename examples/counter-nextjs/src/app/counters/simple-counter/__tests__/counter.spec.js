import React from 'react';
import Counter from '../counter';
import { CounterStore } from '../../../stores';
import { render, fireEvent } from '@testing-library/react';

describe('Counter', () => {
  const counterStore = {
    state: {
      count: 0
    },
    incrementCount: jest.fn(),
    decrementCount: jest.fn()
  };
  let ContextComponent = () => (
    <CounterStore.Context.Provider value={counterStore}>
      <Counter />
    </CounterStore.Context.Provider>
  );
  it('renders default', async () => {
    let wrapper = await render(<ContextComponent />);
    expect(wrapper.getByTestId('counter-wrap')).toMatchSnapshot();
  });
  it('tests increment button', async () => {
    let wrapper = await render(<ContextComponent />);
    fireEvent.click(wrapper.getByTestId('increment'));
    expect(counterStore.incrementCount).toHaveBeenCalled();
  });
  it('tests decrement button', async () => {
    let wrapper = await render(<ContextComponent />);
    fireEvent.click(wrapper.getByTestId('decrement'));
    expect(counterStore.decrementCount).toHaveBeenCalled();
  });
});

