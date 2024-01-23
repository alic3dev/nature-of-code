import React from 'react'

import {
  ExerciseZeroDotOne,
  ExerciseZeroDotTwo,
  ExerciseZeroDotThree,
  ExerciseZeroDotFour,
  ExerciseZeroDotFive,
} from './0'
import { ExerciseOneDotOne } from './1'

export const exerciseLookup: React.FunctionComponent[][] = [
  [
    ExerciseZeroDotOne,
    ExerciseZeroDotTwo,
    ExerciseZeroDotThree,
    ExerciseZeroDotFour,
    ExerciseZeroDotFive,
  ],
  [ExerciseOneDotOne],
]
