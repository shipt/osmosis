import Link from 'next/link'
import styles from './page.module.css'

function Home() {
  return (
      <main className={styles.main}>
        <h3>Counter Examples</h3>
        <br />
        <Link href='./counters/simple-counter'>Simple Counter</Link>
        <Link href='./counters/persisted-counter'>Persisted Counter</Link>
        <Link href='./counters/reducer-counter'>Counter With Reducer</Link>
        <Link href='./counters/counter-by-name'>Dynamic Counter</Link>
      </main>
  )
}

export default Home;
