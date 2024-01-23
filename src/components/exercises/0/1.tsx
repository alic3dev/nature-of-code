import React from 'react'

import { AnimatedCanvasAnimationFrame } from '@/components/exercises/AnimatedCanvas'
import { ControlsState } from '@/components/exercises/CanvasControls'

import { Position, useWalker, Walker } from '@/utils/useWalker'

import { Exercise } from '../Exercise'

export function ExerciseZeroDotOne(): JSX.Element {
  const finishedRef = React.useRef<boolean>(false)
  const walker: Walker = useWalker()

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

    if (Math.random() * 2 > 1) {
      walker.position.x += Math.random() * 3 > 1 ? 1 : -1
    } else {
      walker.position.y += Math.random() * 3 > 1 ? 1 : -1
    }

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

  return (
    <Exercise
      onUpdateState={onUpdateState}
      animationFrame={animationFrame}
      chapter={0}
      instructions={
        'Create a random walker that has a tendency to move down and to the right. (We’ll see the solution to this in the next section.)'
      }
    />
  )
}
