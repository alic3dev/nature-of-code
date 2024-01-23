import { AnimatedCanvasAnimationFrame } from '@/components/exercises/AnimatedCanvas'
import { ControlsState } from '@/components/exercises/CanvasControls'

import { Position, useWalker, Walker } from '@/utils/useWalker'

import { Exercise } from '../Exercise'
import { normal } from '@/utils/distributions'

export function ExerciseZeroDotFive(): JSX.Element {
  const walker: Walker = useWalker()

  const animationFrame: AnimatedCanvasAnimationFrame = ({
    ctx,
  }: {
    ctx: CanvasRenderingContext2D
  }): boolean => {
    const prevImage = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height,
      {
        colorSpace: 'srgb',
      },
    )

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    for (let i: number = 3; i < prevImage.data.length; i += 4) {
      if (prevImage.data[i]) prevImage.data[i]--
    }

    ctx.putImageData(prevImage, 0, 0)

    const prevCanvasPosition: Position = walker.getCanvasPosition(ctx)

    ctx.beginPath()
    ctx.moveTo(
      prevCanvasPosition.x + walker.size.width / 4,
      prevCanvasPosition.y + walker.size.height / 4,
    )

    if (Math.random() > 0.5) {
      walker.position.x += Math.round(normal.boxMuller(-10, 10))
    } else {
      walker.position.y += Math.round(normal.boxMuller(-10, 10))
    }

    const canvasPosition: Position = walker.getCanvasPosition(ctx)

    if (canvasPosition.x > ctx.canvas.width) {
      walker.position.x = ctx.canvas.width / walker.size.width / 2
    } else if (canvasPosition.x < 0) {
      walker.position.x = -(ctx.canvas.width / walker.size.width / 2) + 1
    }

    if (canvasPosition.y > ctx.canvas.height) {
      walker.position.y = ctx.canvas.height / walker.size.height / 2
    } else if (canvasPosition.y < 0) {
      walker.position.y = -(ctx.canvas.height / walker.size.height / 2) + 1
    }

    const currentCanvasPosition = walker.getCanvasPosition(ctx)

    ctx.lineTo(
      currentCanvasPosition.x + walker.size.width / 4,
      currentCanvasPosition.y + walker.size.height / 4,
    )
    ctx.strokeStyle = '#0F0'
    ctx.lineWidth = 2
    ctx.stroke()

    walker.draw(ctx)

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
      onUpdateState={onUpdateState}
      animationFrame={animationFrame}
      chapter={0}
      canvasRenderingContext2DSettings={{
        willReadFrequently: true,
      }}
      instructions="A Gaussian random walk is defined as one in which the step size (how far the object moves in a given direction) is generated with a normal distribution. Implement this variation of the Walker class."
    />
  )
}
