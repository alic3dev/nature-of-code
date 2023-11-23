import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>
          <Link to="/">Nature of Code</Link>
        </h1>
      </div>
    </header>
  )
}
