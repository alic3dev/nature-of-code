import React from 'react'

import { Instructions } from '@/components/exercises/Instructions'

import styles from './Exercise.module.scss'

export function ExerciseMinimal({
  children,
  chapter,
  instructions,
}: React.PropsWithChildren<{
  chapter: number
  instructions: React.ReactNode
}>) {
  return (
    <div className={styles.exercise}>
      <div className={styles['children-wrapper']}>{children}</div>

      <Instructions chapter={chapter}>{instructions}</Instructions>
    </div>
  )
}
