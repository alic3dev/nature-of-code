import React from 'react'

import {
  ExerciseOneDotOne,
  ExerciseOneDotTwo,
  ExerciseOneDotThree,
  ExerciseOneDotFour,
  ExerciseOneDotFive,
} from './1'
import { ExerciseTwoDotOne } from './2'

export const exerciseLookup: React.FunctionComponent[][] = [
  [
    ExerciseOneDotOne,
    ExerciseOneDotTwo,
    ExerciseOneDotThree,
    ExerciseOneDotFour,
    ExerciseOneDotFive,
  ],
  [ExerciseTwoDotOne],
]
