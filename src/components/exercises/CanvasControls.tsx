import {
  MdOutlinePlayArrow,
  MdOutlineReplay,
  MdOutlineStop,
} from 'react-icons/md'

import styles from './CanvasControls.module.scss'

export type ControlsState = 'playing' | 'stopped'

export function CanvasControls({
  state = 'playing',
  updateState,
}: {
  state: ControlsState
  updateState: (state: ControlsState | 'replay') => void
}) {
  const onPlay = () => updateState('playing')
  const onReplay = () => updateState('replay')
  const onStop = () => updateState('stopped')

  return (
    <div className={styles.controls}>
      {state === 'playing' ? (
        <>
          <button
            onClick={onStop}
            className={`${styles.control} ${styles.stop}`}
          >
            <MdOutlineStop />
          </button>
          <button
            onClick={onReplay}
            className={`${styles.control} ${styles.replay}`}
          >
            <MdOutlineReplay />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onPlay}
            className={`${styles.control} ${styles.play}`}
          >
            <MdOutlinePlayArrow />
          </button>
          <button
            onClick={onReplay}
            className={`${styles.control} ${styles.replay}`}
          >
            <MdOutlineReplay />
          </button>
        </>
      )}
    </div>
  )
}
