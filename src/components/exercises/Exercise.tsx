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

export function Exercise({
  onUpdateState,
  animationFrame,
  chapter,
  instructions,
}: {
  onUpdateState: (newState: ControlsState | 'replay') => void
  animationFrame: AnimatedCanvasAnimationFrame
  chapter: number
  instructions: React.ReactNode
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

    onUpdateState(newState)
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
        <AnimatedCanvas animationFrame={_animationFrame} />
      </div>

      <Instructions chapter={chapter}>{instructions}</Instructions>
    </div>
  )
}
