import React from 'react'
import {
  Params,
  useParams,
  useNavigate,
  Link,
  NavigateFunction,
} from 'react-router-dom'

import { exerciseLookup } from './components/exercises'
import { Header, Sidebar } from './components/layout'

import styles from './ExercisesApp.module.scss'

export interface ParsedExercisesParams {
  chapter: number
  exercise: number
}

export function ExercisesApp(): JSX.Element {
  const params: Readonly<Params<string>> = useParams()
  const navigate: NavigateFunction = useNavigate()

  const parsedParams = React.useMemo<ParsedExercisesParams>(
    (): ParsedExercisesParams => ({
      chapter: parseInt(params.chapter!),
      exercise: parseInt(params.exercise!),
    }),
    [params],
  )

  const memoizedExerciceComponent =
    React.useMemo<React.ReactElement | null>((): React.ReactElement | null => {
      if (isNaN(parsedParams.chapter) || isNaN(parsedParams.exercise)) {
        return null
      }

      const chapterLookup: React.FunctionComponent[] =
        exerciseLookup[parsedParams.chapter - 1]

      if (!chapterLookup) return null

      const ExerciceComponent: React.FunctionComponent | undefined =
        chapterLookup[parsedParams.exercise - 1]

      return ExerciceComponent ? <ExerciceComponent /> : null
    }, [parsedParams])

  React.useEffect((): void => {
    if (!memoizedExerciceComponent) {
      navigate('/exercises/1/1')
    }
  }, [memoizedExerciceComponent, navigate])

  return (
    <div className={styles['exercises-app']}>
      <Header />

      <div className={styles.content}>
        <Sidebar
          selectedChapter={parsedParams.chapter}
          selectedExercise={parsedParams.exercise}
        />

        <main className={styles['exercise-container']}>
          {memoizedExerciceComponent ? (
            memoizedExerciceComponent
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h2>Not found, redirecting...</h2>

              <br />

              <p>
                If you are not redirected after a few moments, please{' '}
                <Link to="/exercises/1/1">click here</Link>.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
