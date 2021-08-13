import React from 'react';
import Counter from '../counter';
import { counterRef } from '../store';
import { render, fireEvent } from '@testing-library/react';

describe('Counter', () => {
  const CounterStore = {
    state: {
      count: 0
    },
    incrementCount: jest.fn(),
    decrementCount: jest.fn()
  };
  console.log(counterRef);
  let ContextComponent = () => (
    <counterRef.Context.Provider value={[CounterStore]}>
      <Counter />
    </counterRef.Context.Provider>
  );
  it('renders default', async () => {
    let wrapper = await render(<ContextComponent />);
    expect(wrapper.getByTestId('counter-wrap')).toMatchSnapshot();
  });
  it('tests increment button', async () => {
    let wrapper = await render(<ContextComponent />);
    fireEvent.click(wrapper.getByTestId('increment'));
    expect(CounterStore.incrementCount).toHaveBeenCalled();
  });
  it('tests decrement button', async () => {
    let wrapper = await render(<ContextComponent />);
    fireEvent.click(wrapper.getByTestId('decrement'));
    expect(CounterStore.decrementCount).toHaveBeenCalled();
  });
});
