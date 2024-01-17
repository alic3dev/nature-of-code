import React from 'react'
import { Link } from 'react-router-dom'

import {
  FaGithub,
  FaPersonHalfDress,
  FaPlus,
  FaCreativeCommons,
  FaCreativeCommonsBy,
  FaCreativeCommonsNc,
} from 'react-icons/fa6'
import { TbBrandReact, TbBrandTypescript, TbBrandVite } from 'react-icons/tb'
import { LiaDumbbellSolid } from 'react-icons/lia'

import {
  AnimatedCanvas,
  AnimatedCanvasAnimationFrame,
} from '@/components/exercises/AnimatedCanvas'

import styles from './App.module.scss'
import { Position, useWalker, Walker } from './utils/useWalker'

const MAX_AMOUNT_OF_WALKERS: number = 500

export function App(): JSX.Element {
  const walker: Walker = useWalker({ x: 0, y: 0 }, { width: 100, height: 100 })
  const previousPositionsRef = React.useRef<Position[]>([]).current

  const animationFrame: AnimatedCanvasAnimationFrame = (
    ctx: CanvasRenderingContext2D,
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    previousPositionsRef.splice(
      0,
      previousPositionsRef.length - MAX_AMOUNT_OF_WALKERS + 1,
    )

    while (previousPositionsRef.length < MAX_AMOUNT_OF_WALKERS) {
      previousPositionsRef.push({
        x:
          Math.floor(
            Math.random() * (ctx.canvas.width / walker.size.width) -
              ctx.canvas.width / (walker.size.width * 2),
          ) + 1,
        y:
          Math.floor(
            Math.random() * (ctx.canvas.height / walker.size.height) -
              ctx.canvas.height / (walker.size.height * 2),
          ) + 1,
      })
    }

    for (let i: number = 0; i < previousPositionsRef.length - 1; i++) {
      walker.position = previousPositionsRef[i]

      const opacity: string = Math.floor(
        Math.min(i / MAX_AMOUNT_OF_WALKERS, 1) * 100,
      ).toString(16)

      walker.draw(ctx, `#22AA77${opacity.length < 2 ? `0${opacity}` : opacity}`)
    }

    return true
  }

  return (
    <>
      <div className={styles['canvas-wrapper']}>
        <AnimatedCanvas animationFrame={animationFrame} noMaxWidth />
      </div>

      <main className={styles.app}>
        <h1>Nature of Code</h1>

        <p>
          This is a collection of <Link to="/exercises/1/1">exercises</Link>{' '}
          from{' '}
          <a href="https://natureofcode.com/" rel="noreferrer">
            The Nature of Code
          </a>{' '}
          by Daniel Shiffman{' '}
          <span className={styles.licensed}>
            (licensed under{' '}
            <a
              href="http://creativecommons.org/licenses/by-nc/3.0/"
              rel="noreferrer"
            >
              CC BY-NC 4.0{' '}
              <span className={styles.icons}>
                <FaCreativeCommons /> <FaCreativeCommonsBy />{' '}
                <FaCreativeCommonsNc />
              </span>
            </a>
            )
          </span>
        </p>

        <div className={styles.implementation}>
          <h3 className={styles['implementation-header']}>Implemented with</h3>

          <a
            href="https://react.dev/"
            className={`${styles['implementation-link']} ${styles.react}`}
            rel="noreferrer"
          >
            <span className={styles['implementation-icon']}>
              <TbBrandReact />
            </span>{' '}
            React
          </a>
          <span className={styles['implementation-plus']}>
            <FaPlus />
          </span>
          <a
            href="https://vitejs.dev/"
            rel="noreferrer"
            className={`${styles['implementation-link']} ${styles.vite}`}
          >
            <span className={styles['implementation-icon']}>
              <TbBrandVite />
            </span>{' '}
            Vite
          </a>
          <span className={styles['implementation-plus']}>
            <FaPlus />
          </span>
          <a
            href="https://www.typescriptlang.org/"
            className={`${styles['implementation-link']} ${styles.typescript}`}
            rel="noreferrer"
          >
            <span className={styles['implementation-icon']}>
              <TbBrandTypescript />
            </span>{' '}
            Typescript
          </a>
        </div>

        <nav className={styles.navigation}>
          <Link to="/exercises/1/1" className={styles['navigation-link']}>
            <span className={styles['navigation-icon']}>
              <LiaDumbbellSolid />
            </span>
            Exercises
          </Link>
          <a
            href="https://github.com/alic3dev/nature-of-code"
            className={styles['navigation-link']}
          >
            <span className={styles['navigation-icon']}>
              <FaGithub />
            </span>
            Repo
          </a>
          <a href="https://alic3.dev" className={styles['navigation-link']}>
            <span className={styles['navigation-icon']}>
              <FaPersonHalfDress />
            </span>
            Alic3
          </a>
        </nav>
      </main>
    </>
  )
}
