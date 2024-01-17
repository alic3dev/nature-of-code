import { Exercise } from '@/components/exercises/Exercise'
// import { ControlsState } from '@/components/exercises/CanvasControls'
import { AnimatedCanvasAnimationFrame } from '@/components/exercises/AnimatedCanvas'

import { useWalker, Walker } from '@/utils/useWalker'

export function ExerciseOneDotFour(): JSX.Element {
  const walker: Walker = useWalker({ x: 0, y: 0 }, { width: 100, height: 100 })

  const animationFrame: AnimatedCanvasAnimationFrame = (ctx) => {
    ctx.fillStyle = '#01000103'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    for (let i = 0; i < 100; i++) {
      walker.size.width = Math.pow(Math.random() / 1, 2) * 100 + 100
      walker.size.height = Math.pow(Math.random() / 1, 2) * 100 + 100 // walker.size.width

      const pos1 =
        (Math.pow(Math.random() / 1, 4) / 1) *
        20 *
        (200 / walker.size.width) *
        (Math.random() > 0.5 ? -1 : 1)

      if (Math.random() > 0.5) {
        walker.position.x = pos1
        walker.position.y = walker.position.x
      } else {
        walker.position.x = pos1
        walker.position.y = -walker.position.x
      }

      walker.draw(
        ctx,
        `rgba(${Math.pow(Math.random() / 1, 2) * 205 + 50},${
          Math.pow(Math.random() / 1, 40) * 205 + 50
        },${Math.pow(Math.random() / 1, 20) * 205 + 50}, ${0.002})`,
        true,
      )

      const pos2 =
        (Math.pow(Math.random() / 1, 2) / 1) *
        20 *
        (200 / walker.size.width) *
        (Math.random() > 0.5 ? -1 : 1)

      const pos3 =
        (Math.pow(Math.random() / 1, 2) / 1) *
        20 *
        (200 / walker.size.height) *
        (Math.random() > 0.5 ? -1 : 1)

      ctx.beginPath()
      ctx.moveTo(
        walker.getCanvasPosition(ctx).x,
        walker.getCanvasPosition(ctx).y,
      )

      walker.position.x = pos2
      walker.position.y = pos3

      ctx.lineTo(
        walker.getCanvasPosition(ctx).x,
        walker.getCanvasPosition(ctx).y,
      )
      ctx.strokeStyle = '#00000009'
      ctx.stroke()
      ctx.closePath()

      walker.draw(
        ctx,
        `rgba(${Math.pow(Math.random() / 1, 5) * 205 + 50},${
          Math.pow(Math.random() / 1, 20) * 205 + 50
        },${Math.pow(Math.random() / 1, 2) * 205 + 50}, ${0.002})`,
        true,
      )
    }

    return true
  }

  const onUpdateState = (/*newState: ControlsState | 'replay'*/) => {
    // if (newState === 'replay') {
    // }
  }

  return (
    <Exercise
      animationFrame={animationFrame}
      onUpdateState={onUpdateState}
      chapter={1}
      // updateAfterMS={0}
      instructions="Consider a simulation of paint splatter drawn as a collection of colored dots. Most of the paint clusters around a central location, but some dots do splatter out towards the edges. Can you use a normal distribution of random numbers to generate the locations of the dots? Can you also use a normal distribution of random numbers to generate a color palette?"
    />
  )
}
