import React from 'react'

import {
  ExerciseZeroDotOne,
  ExerciseZeroDotTwo,
  ExerciseZeroDotThree,
  ExerciseZeroDotFour,
  ExerciseZeroDotFive,
  ExerciseZeroDotSix,
} from './0'
import { ExerciseOneDotOne } from './1'

export const exerciseLookup: React.FunctionComponent[][] = [
  [
    ExerciseZeroDotOne,
    ExerciseZeroDotTwo,
    ExerciseZeroDotThree,
    ExerciseZeroDotFour,
    ExerciseZeroDotFive,
    ExerciseZeroDotSix,
  ],
  [ExerciseOneDotOne],
]
