import React from 'react'
import { Link } from 'react-router-dom'

import attribution from '@/utils/attribution'

import styles from './Instructions.module.scss'

const localStorageOpenKey = 'nature-of-code:instructions-open'

export function Instructions({
  chapter,
  children,
}: React.PropsWithChildren<{ chapter: number }>) {
  const [open, setOpen] = React.useState<boolean>(() => {
    try {
      const localStorageValue: unknown = JSON.parse(
        window.localStorage.getItem(localStorageOpenKey) ?? 'true',
      )

      if (typeof localStorageValue === 'boolean') {
        return localStorageValue
      } else {
        window.localStorage.removeItem(localStorageOpenKey)
      }
    } catch {
      window.localStorage.removeItem(localStorageOpenKey)
    }

    return true
  })

  React.useEffect(() => {
    window.localStorage.setItem(localStorageOpenKey, JSON.stringify(open))
  }, [open])

  return (
    <div
      className={`${styles.instructions} ${open ? '' : styles.closed}`}
      onClick={open ? undefined : () => setOpen(true)}
    >
      Instructions:
      <button
        className={styles.toggle}
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-label={open ? 'close' : 'open'}
      >
        [ {open ? '-' : '+'} ]
      </button>
      <div className={styles.text}>
        <p>
          <span className={styles.quote}>❝</span>
          {children}
          <span className={styles.quote}>❞</span>
        </p>

        <div className={styles.attribution}>
          <Link
            to={attribution.getArtOfCodeChapterURL(chapter)}
            target="_blank"
            rel="noreferrer"
          >
            The Nature of Code
          </Link>
        </div>
      </div>
    </div>
  )
}
