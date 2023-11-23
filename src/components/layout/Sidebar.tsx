import React from 'react'
import { Link } from 'react-router-dom'

import { exerciseLookup } from '../exercises'

import styles from './Sidebar.module.scss'

interface SidebarItem {
  chapter: number
  exercise: number
}

export function Sidebar({
  selectedChapter,
  selectedExercise,
}: {
  selectedChapter: number
  selectedExercise: number
}) {
  const items: SidebarItem[] = React.useMemo(() => {
    const res: SidebarItem[] = []

    for (let chapter = 1; chapter <= exerciseLookup.length; chapter++) {
      for (
        let exercise = 1;
        exercise <= exerciseLookup[chapter - 1].length;
        exercise++
      ) {
        res.push({
          chapter,
          exercise,
        })
      }
    }

    return res
  }, [])

  return (
    <aside className={styles.sidebar}>
      {/* <div className={styles.title}>
        <h2>Exercises</h2>
      </div> */}

      {items.map((item, index) => (
        <Link
          key={`${item.chapter}.${item.exercise}.${index}`}
          to={`/exercises/${item.chapter}/${item.exercise}`}
          className={`${styles.link} ${
            item.chapter === selectedChapter &&
            item.exercise === selectedExercise
              ? styles.current
              : ''
          }`}
        >
          Exercise {item.chapter}.{item.exercise}
        </Link>
      ))}
    </aside>
  )
}
