import React from 'react'

import {
  ExerciseOneDotOne,
  ExerciseOneDotTwo,
  ExerciseOneDotThree,
  ExerciseOneDotFour,
} from './1'
import { ExerciseTwoDotOne } from './2'

export { ExerciseOneDotOne, ExerciseOneDotTwo }
export { ExerciseTwoDotOne }

export const exerciseLookup: React.FunctionComponent[][] = [
  [
    ExerciseOneDotOne,
    ExerciseOneDotTwo,
    ExerciseOneDotThree,
    ExerciseOneDotFour,
  ],
  [ExerciseTwoDotOne],
]
