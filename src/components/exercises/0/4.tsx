import React from 'react'

import { Exercise, ExerciseControl } from '@/components/exercises/Exercise'
import { AnimatedCanvasAnimationFrame } from '@/components/exercises/AnimatedCanvas'

import { normal } from '@/utils/distributions'
import { Position, useWalker, Walker } from '@/utils/useWalker'

interface NormalDistributionAttributes {
  skewX: number
  skewY: number
  normalX: number
  normalY: number
}

export function ExerciseZeroDotFour(): JSX.Element {
  const walker: Walker = useWalker({ x: 0, y: 0 }, { width: 100, height: 100 })

  const normalDistributionAttributesRef =
    React.useRef<NormalDistributionAttributes>({
      skewX: 1,
      skewY: 1,
      normalX: 1,
      normalY: 1,
    })

  const animationFrame: AnimatedCanvasAnimationFrame = ({ ctx, frame }) => {
    if (frame <= 1) ctx.fillStyle = '#000000FF'
    else ctx.fillStyle = '#00000011'

    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    if (frame % 3) return true

    for (let i: number = 0; i < 33; i++) {
      // TODO: May as well make the size a normal distribution as well?
      walker.size.width = Math.pow(Math.random() / 1, 2) * 20 + 20
      walker.size.height = Math.pow(Math.random() / 1, 2) * 20 + 20

      const mullerPosition: Position = {
        x: normal.boxMuller(
          (ctx.canvas.width / walker.size.width) * -1,
          ctx.canvas.width / walker.size.width,
          normalDistributionAttributesRef.current.skewX,
          normalDistributionAttributesRef.current.normalX,
        ),
        y: normal.boxMuller(
          (ctx.canvas.height / walker.size.height) * -1,
          ctx.canvas.height / walker.size.height,
          normalDistributionAttributesRef.current.skewY,
          normalDistributionAttributesRef.current.normalY,
        ),
      }

      walker.position.x = mullerPosition.x
      walker.position.y = mullerPosition.y

      walker.draw(
        ctx,
        `rgb(
          ${normal.boxMuller(0, 255)},
          ${normal.boxMuller(0, 255)},
          ${normal.boxMuller(0, 255)}
        )`,
        true,
      )
    }

    return true
  }

  const controls: ExerciseControl[] = React.useMemo<ExerciseControl[]>(
    (): ExerciseControl[] => [
      {
        id: crypto.randomUUID(),
        title: 'Skew X',
        type: 'range',
        min: 0,
        max: 2000,
        defaultValue: 1000,
        onChange: (v: number): void => {
          normalDistributionAttributesRef.current.skewX = v / 1000
        },
      },
      {
        id: crypto.randomUUID(),
        title: 'Skew Y',
        type: 'range',
        min: 0,
        max: 2000,
        defaultValue: 1000,
        onChange: (v: number): void => {
          normalDistributionAttributesRef.current.skewY = v / 1000
        },
      },
      {
        id: crypto.randomUUID(),
        title: 'Normal X',
        type: 'range',
        min: 0,
        max: 2000,
        defaultValue: 2000,
        onChange: (v: number): void => {
          normalDistributionAttributesRef.current.normalX = v / 2000
        },
      },
      {
        id: crypto.randomUUID(),
        title: 'Normal Y',
        type: 'range',
        min: 0,
        max: 2000,
        defaultValue: 2000,
        onChange: (v: number): void => {
          normalDistributionAttributesRef.current.normalY = v / 2000
        },
      },
    ],
    [],
  )

  return (
    <Exercise
      animationFrame={animationFrame}
      controls={controls}
      chapter={0}
      instructions="Consider a simulation of paint splatter drawn as a collection of colored dots. Most of the paint clusters around a central position, but some dots splatter out toward the edges. Can you use a normal distribution of random numbers to generate the positions of the dots? Can you also use a normal distribution of random numbers to generate a color palette? Try creating a slider to adjust the standard deviation."
    />
  )
}
