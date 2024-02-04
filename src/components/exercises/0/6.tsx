import React from 'react'

import { AnimatedCanvasAnimationFrame } from '@/components/exercises/AnimatedCanvas'
import { ControlsState } from '@/components/exercises/CanvasControls'

import { Position, useWalker, Walker } from '@/utils/useWalker'
import { normal } from '@/utils/distributions'

import { Exercise, ExerciseControl } from '../Exercise'

export function ExerciseZeroDotSix(): JSX.Element {
  const finishedRef = React.useRef<boolean>(false)
  const walker: Walker = useWalker()

  const normalDistributionAttributesRef = React.useRef<{
    stepMinimum: number
    stepMaximum: number
  }>({ stepMinimum: -10, stepMaximum: 10 })

  const animationFrame: AnimatedCanvasAnimationFrame = ({
    ctx,
  }: {
    ctx: CanvasRenderingContext2D
  }): boolean => {
    if (finishedRef.current) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      finishedRef.current = false
    }

    walker.draw(ctx)

    walker.boundedMove(ctx, {
      x: normal.acceptReject(
        normalDistributionAttributesRef.current.stepMinimum,
        normalDistributionAttributesRef.current.stepMaximum,
      ),
      y: normal.acceptReject(
        normalDistributionAttributesRef.current.stepMinimum,
        normalDistributionAttributesRef.current.stepMaximum,
      ),
    })

    const canvasPosition: Position = walker.getCanvasPosition(ctx)

    if (
      canvasPosition.x >= ctx.canvas.width ||
      canvasPosition.y >= ctx.canvas.height
    ) {
      finishedRef.current = true
      return false
    }

    return true
  }

  const onUpdateState = (newState: ControlsState | 'replay'): void => {
    if (newState === 'replay') {
      walker.position.x = 0
      walker.position.y = 0
    } else if (newState === 'playing' && finishedRef.current) {
      onUpdateState('replay')
    }
  }

  const controls: ExerciseControl[] = React.useMemo<ExerciseControl[]>(
    (): ExerciseControl[] => [
      {
        id: crypto.randomUUID(),
        title: 'Step minimum',
        type: 'range',
        min: 0,
        max: 2000,
        step: 100,
        defaultValue: 0,
        onChange: (v: number): void => {
          normalDistributionAttributesRef.current.stepMinimum = Math.floor(
            (v - 1000) / 100,
          )
        },
      },
      {
        id: crypto.randomUUID(),
        title: 'Step maximum',
        type: 'range',
        min: 0,
        max: 2000,
        step: 100,
        defaultValue: 2000,
        onChange: (v: number): void => {
          normalDistributionAttributesRef.current.stepMaximum = Math.floor(
            (v - 1000) / 100,
          )
        },
      },
    ],
    [],
  )

  return (
    <Exercise
      onUpdateState={onUpdateState}
      animationFrame={animationFrame}
      chapter={0}
      controls={controls}
      instructions={
        'Use a custom probability distribution to vary the size of the random walker’s steps. The step size can be determined by influencing the range of values picked with a qualifying random value. Can you map the probability to a quadratic function by making the likelihood that a value is picked equal to the value squared?'
      }
    />
  )
}
