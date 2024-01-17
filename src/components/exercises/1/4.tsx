import { Exercise } from '@/components/exercises/Exercise'
// import { ControlsState } from '@/components/exercises/CanvasControls'
import { AnimatedCanvasAnimationFrame } from '@/components/exercises/AnimatedCanvas'

import { normal } from '@/utils/distributions'
import { useWalker, Walker } from '@/utils/useWalker'

export function ExerciseOneDotFour(): JSX.Element {
  const walker: Walker = useWalker({ x: 0, y: 0 }, { width: 100, height: 100 })

  const animationFrame: AnimatedCanvasAnimationFrame = ({ ctx, frame }) => {
    if (frame <= 1) ctx.fillStyle = '#000'
    else ctx.fillStyle = '#00000011'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    if (frame % 3) return true

    for (let i = 0; i < 33; i++) {
      walker.size.width = Math.pow(Math.random() / 1, 2) * 20 + 20
      walker.size.height = Math.pow(Math.random() / 1, 2) * 20 + 20

      walker.position.x = normal.boxMuller(
        (ctx.canvas.width / walker.size.width) * -1,
        ctx.canvas.width / walker.size.width,
      )
      walker.position.y = normal.boxMuller(
        (ctx.canvas.height / walker.size.height) * -1,
        ctx.canvas.height / walker.size.height,
      )

      walker.draw(
        ctx,
        `rgba(${normal.boxMuller(0, 255)},${normal.boxMuller(
          0,
          255,
        )},${normal.boxMuller(0, 255)}, ${1.666})`,
        true,
      )
    }

    return true
  }

  return (
    <Exercise
      animationFrame={animationFrame}
      chapter={1}
      instructions="Consider a simulation of paint splatter drawn as a collection of colored dots. Most of the paint clusters around a central location, but some dots do splatter out towards the edges. Can you use a normal distribution of random numbers to generate the locations of the dots? Can you also use a normal distribution of random numbers to generate a color palette?"
    />
  )
}
