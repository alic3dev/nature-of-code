import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Params,
} from 'react-router-dom'

import { App } from './App.tsx'
import { ExercisesApp, ParsedExercisesParams } from './ExercisesApp.tsx'

import { exerciseLookup } from './components/exercises'

import './index.scss'

const rootElement: HTMLElement | null = document.getElementById('root')

if (rootElement) {
  const regExpOnlyNumbers: RegExp = RegExp(/^[0-9]*$/)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/exercises/:chapter?/:exercise?',
      loader: ({ params }): Params<string> | Response => {
        if (!params.chapter || !regExpOnlyNumbers.test(params.chapter)) {
          return redirect(`/exercises/1/1`)
        } else if (
          !params.exercise ||
          !regExpOnlyNumbers.test(params.exercise)
        ) {
          return redirect(`/exercises/${params.chapter}/1`)
        }

        const parsedParams: ParsedExercisesParams = {
          chapter: parseInt(params.chapter),
          exercise: parseInt(params.exercise),
        }

        if (
          parsedParams.chapter < 1 ||
          parsedParams.chapter > exerciseLookup.length
        ) {
          return redirect(`/exercises/1/1`)
        } else if (
          parsedParams.exercise < 1 ||
          parsedParams.exercise >
            exerciseLookup[parsedParams.chapter - 1].length
        ) {
          return redirect(`/exercises/${params.chapter}/1`)
        }

        return params
      },
      element: <ExercisesApp />,
    },
  ])

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
} else {
  alert('Something has gone horribly wrong 😰')
}
