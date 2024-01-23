import React from 'react'

import { Instructions } from '@/components/exercises/Instructions'
import {
  AnimatedCanvas,
  AnimatedCanvasAnimationFrame,
} from '@/components/exercises/AnimatedCanvas'
import {
  CanvasControls,
  ControlsState,
} from '@/components/exercises/CanvasControls'

import styles from './Exercise.module.scss'

interface _ExerciseControl {
  id: string
  title: string
  onChange: (v: never) => void
}

interface ExerciseControlRange extends _ExerciseControl {
  type: 'range'
  min: number
  max: number
  step?: number
  defaultValue: number
  onChange: (v: number) => void
}

export type ExerciseControl = ExerciseControlRange

export function Exercise({
  onUpdateState,
  animationFrame,
  controls,
  chapter,
  instructions,
  updateAfterMS,
  canvasRenderingContext2DSettings,
}: {
  onUpdateState?: (newState: ControlsState | 'replay') => void
  animationFrame: AnimatedCanvasAnimationFrame
  controls?: ExerciseControl[]
  chapter: number
  instructions: React.ReactNode
  updateAfterMS?: number
  canvasRenderingContext2DSettings?: CanvasRenderingContext2DSettings
}) {
  const [replayCounter, setReplayCounter] = React.useState<number>(0)
  const [state, setState] = React.useState<ControlsState>('playing')

  const _onUpdateState = (newState: ControlsState | 'replay') => {
    if (newState === 'replay') {
      setState('playing')
      setReplayCounter((previousReplayCounter) => previousReplayCounter + 1)
    } else {
      setState(newState)
    }

    if (onUpdateState) onUpdateState(newState)
  }

  const _animationFrame: AnimatedCanvasAnimationFrame = (...args) => {
    if (state === 'stopped') return true

    const continuing = animationFrame(...args)

    if (!continuing) setState('stopped')

    return continuing
  }

  return (
    <div key={replayCounter} className={styles.exercise}>
      <CanvasControls state={state} updateState={_onUpdateState} />

      <div className={styles['canvas-wrapper']}>
        <AnimatedCanvas
          animationFrame={_animationFrame}
          updateAfterMS={updateAfterMS}
          canvasRenderingContext2DSettings={canvasRenderingContext2DSettings}
        />
      </div>

      {controls?.length && (
        <div className={styles['exercise-controls']}>
          {controls.map(
            (control: ExerciseControl): JSX.Element => (
              <label key={control.id}>
                {control.title}
                {control.type === 'range' && (
                  <input
                    type="range"
                    min={control.min}
                    max={control.max}
                    step={control.step ?? (control.max - control.min) / 10}
                    defaultValue={control.defaultValue}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>,
                    ): void => control.onChange(event.target.valueAsNumber)}
                  />
                )}
              </label>
            ),
          )}
        </div>
      )}

      <Instructions chapter={chapter}>{instructions}</Instructions>
    </div>
  )
}
