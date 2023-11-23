// import React from 'react'
import { Link } from 'react-router-dom'

import styles from './App.module.scss'

export function App() {
  return (
    <main className={styles.app}>
      <h1>Nature of Code</h1>

      <p>
        This is a collection of exercises from the book{' '}
        <a href="https://natureofcode.com/" target="_blank" rel="noreferrer">
          The Nature of Code
        </a>{' '}
        by Daniel Shiffman
      </p>

      <Link to="/exercises/1/1">Exercises</Link>
    </main>
  )
}
