import { Exercise } from '@/components/exercises/Exercise'
import { ControlsState } from '@/components/exercises/CanvasControls'
import { AnimatedCanvasAnimationFrame } from '@/components/exercises/AnimatedCanvas'

import { RESOLUTION } from '@/utils/constants'
import { useWalker, Walker, Position } from '@/utils/useWalker'
import { MousePosition, useMousePosition } from '@/utils/useMousePosition'

export function ExerciseOneDotThree(): JSX.Element {
  const mousePosition: MousePosition = useMousePosition()
  const walker: Walker = useWalker()

  const animationFrame: AnimatedCanvasAnimationFrame = (ctx) => {
    walker.draw(ctx)

    const walkerScreenPosition: Position = walker.getScreenPosition(ctx)

    if (Math.random() * 2 > 1) {
      if (mousePosition.x > walkerScreenPosition.x) {
        walker.position.x++
      } else {
        walker.position.x--
      }

      if (mousePosition.y > walkerScreenPosition.y) {
        walker.position.y++
      } else {
        walker.position.y--
      }
    } else {
      walker.position.x += Math.random() * 2 > 1 ? 1 : -1
      walker.position.y += Math.random() * 2 > 1 ? 1 : -1
    }

    const walkerCanvasPosition: Position = walker.getCanvasPosition(ctx)

    if (walkerCanvasPosition.x >= RESOLUTION) {
      walker.position.x--
    } else if (walkerCanvasPosition.x <= 0) {
      walker.position.x++
    }

    if (walkerCanvasPosition.y >= RESOLUTION) {
      walker.position.y--
    } else if (walkerCanvasPosition.y <= 0) {
      walker.position.y++
    }

    return true
  }

  const onUpdateState = (newState: ControlsState | 'replay'): void => {
    if (newState === 'replay') {
      walker.position.x = 0
      walker.position.y = 0
    }
  }

  return (
    <Exercise
      animationFrame={animationFrame}
      onUpdateState={onUpdateState}
      chapter={1}
      instructions="Create a random walker with dynamic probabilities. For example, can you give it a 50% chance of moving in the direction of the mouse?"
    />
  )
}
