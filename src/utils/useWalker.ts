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

export class Walker {
  position: Position = { x: 0, y: 0 }
  size: Size = { height: BLOCK_SIZE, width: BLOCK_SIZE }

  constructor(startingPosition: Position, _size: Size) {
    this.position = startingPosition
    this.size = _size
  }

  getMaximumPosition(ctx: CanvasRenderingContext2D): Position {
    return {
      x: ctx.canvas.width / 2 / this.size.width - this.size.width / 2,
      y: ctx.canvas.height / 2 / this.size.height - this.size.height / 2,
    }
  }

  getCanvasPosition(ctx: CanvasRenderingContext2D): Position {
    return {
      x:
        ctx.canvas.width / 2 -
        this.size.width / 2 +
        this.position.x * this.size.width,
      y:
        ctx.canvas.height / 2 -
        this.size.height / 2 +
        this.position.y * this.size.height,
    }
  }

  getScreenPosition(ctx: CanvasRenderingContext2D): Position {
    const canvasRect: DOMRect = ctx.canvas.getBoundingClientRect()
    const walkerCanvasPosition: Position = this.getCanvasPosition(ctx)

    return {
      x:
        canvasRect.x + canvasRect.width * (walkerCanvasPosition.x / RESOLUTION),
      y:
        canvasRect.y +
        canvasRect.height * (walkerCanvasPosition.y / RESOLUTION),
    }
  }

  boundedMove(ctx: CanvasRenderingContext2D, movement: Position) {
    const maximumPosition: Position = this.getMaximumPosition(ctx)

    this.position.x = Math.min(
      Math.max(this.position.x + movement.x, -maximumPosition.x),
      maximumPosition.x,
    )
    this.position.y = Math.min(
      Math.max(this.position.y + movement.y, -maximumPosition.y),
      maximumPosition.y,
    )
  }

  draw(
    ctx: CanvasRenderingContext2D,
    fillStyle: string | CanvasGradient | CanvasPattern = '#FFF',
    circular = false,
  ): void {
    const canvasPosition = this.getCanvasPosition(ctx)

    ctx.fillStyle = fillStyle

    if (circular) {
      ctx.beginPath()
      ctx.arc(
        canvasPosition.x,
        canvasPosition.y,
        (this.size.width + this.size.height) / 2,
        0,
        360,
      )
      ctx.fill()
      ctx.closePath()
    } else {
      ctx.fillRect(
        canvasPosition.x,
        canvasPosition.y,
        this.size.width / 2,
        this.size.height / 2,
      )
    }
  }
}

export function useWalker(
  startingPosition: Position = { x: 0, y: 0 },
  size: Size = { width: BLOCK_SIZE, height: BLOCK_SIZE },
): Walker {
  const walker = React.useRef<Walker>()

  if (!walker.current) {
    walker.current = new Walker(startingPosition, size)
  }

  return walker.current
}
