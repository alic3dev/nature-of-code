import React from 'react'

import { BLOCK_SIZE, RESOLUTION } from '@/utils/constants'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Walker {
  position: Position
  size: Size

  readonly getCanvasPosition: (ctx: CanvasRenderingContext2D) => Position
  readonly getScreenPosition: (ctx: CanvasRenderingContext2D) => Position
  readonly draw: (
    ctx: CanvasRenderingContext2D,
    fillStyle?: string | CanvasGradient | CanvasPattern,
    circular?: boolean,
  ) => void
}

export function useWalker(
  startingPosition: Position = { x: 0, y: 0 },
  size: Size = { width: BLOCK_SIZE, height: BLOCK_SIZE },
): Walker {
  const walker: React.MutableRefObject<Walker> = React.useRef<Walker>({
    position: startingPosition,
    size: size,
    getCanvasPosition: (ctx: CanvasRenderingContext2D): Position => ({
      x:
        ctx.canvas.width / 2 -
        walker.current.size.width / 2 +
        walker.current.position.x * walker.current.size.width,
      y:
        ctx.canvas.height / 2 -
        walker.current.size.height / 2 +
        walker.current.position.y * walker.current.size.height,
    }),
    getScreenPosition: (ctx: CanvasRenderingContext2D): Position => {
      const canvasRect: DOMRect = ctx.canvas.getBoundingClientRect()
      const walkerCanvasPosition: Position =
        walker.current.getCanvasPosition(ctx)

      return {
        x:
          canvasRect.x +
          canvasRect.width * (walkerCanvasPosition.x / RESOLUTION),
        y:
          canvasRect.y +
          canvasRect.height * (walkerCanvasPosition.y / RESOLUTION),
      }
    },
    draw: (
      ctx: CanvasRenderingContext2D,
      fillStyle: string | CanvasGradient | CanvasPattern = '#FFF',
      circular = false,
    ): void => {
      const canvasPosition = walker.current.getCanvasPosition(ctx)

      ctx.fillStyle = fillStyle

      if (circular) {
        ctx.beginPath()
        ctx.arc(
          canvasPosition.x,
          canvasPosition.y,
          (walker.current.size.width + walker.current.size.height) / 2,
          0,
          360,
        )
        ctx.fill()
        ctx.closePath()
      } else {
        ctx.fillRect(
          canvasPosition.x,
          canvasPosition.y,
          walker.current.size.width / 2,
          walker.current.size.height / 2,
        )
      }
    },
  })

  return walker.current
}
