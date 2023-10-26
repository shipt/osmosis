import DynamicCounter from './counter-by-name.js';

const counters = ['A', 'B', 'C'];

export default function CounterByName() {
  return (
    <main>
      <h3>Counter By Name</h3>
      {counters.map(name => (
        <DynamicCounter key={name} storeKey={name} name={name} />
      ))}
    </main>
  )
}


