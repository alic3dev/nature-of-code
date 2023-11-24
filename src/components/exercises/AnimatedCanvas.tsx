import React from 'react'

import { RESOLUTION } from '@/utils/constants'

export type AnimatedCanvasAnimationFrame = (
  ctx: CanvasRenderingContext2D,
  elapsedTime: number,
) => boolean

export function AnimatedCanvas({
  animationFrame,
  updateAfterMS = 25,
  noMaxWidth = false,
}: {
  animationFrame: AnimatedCanvasAnimationFrame
  updateAfterMS?: number
  noMaxWidth?: boolean
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (!canvasRef.current) return

    const ctx: CanvasRenderingContext2D | null =
      canvasRef.current.getContext('2d')

    if (!ctx) return

    let animationFrameHandler: number
    let lastTime = 0

    const _animationFrame = (time: number) => {
      const elapsedTime = time - lastTime

      if (elapsedTime < updateAfterMS) {
        return (animationFrameHandler = requestAnimationFrame(_animationFrame))
      }

      lastTime = time

      if (!animationFrame(ctx, elapsedTime)) return

      animationFrameHandler = requestAnimationFrame(_animationFrame)
    }

    animationFrameHandler = requestAnimationFrame(_animationFrame)

    return () => cancelAnimationFrame(animationFrameHandler)
  }, [animationFrame, updateAfterMS])

  return (
    <canvas
      width={RESOLUTION}
      height={RESOLUTION}
      ref={canvasRef}
      style={
        // window.innerWidth < window.innerHeight ?
        { width: '100%', maxWidth: noMaxWidth ? '' : '700px' }
        // : { height: `${(window.innerHeight * 3) / 4}px`, maxWidth: '100%' }

        // TODO: This needs work - sizing
      }
    ></canvas>
  )
}
