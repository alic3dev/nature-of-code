import React from 'react'

export interface MousePosition {
  x: number
  y: number
}

export function useMousePosition() {
  const mousePosition = React.useRef<MousePosition>({
    x: 0,
    y: 0,
  })

  React.useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = event.clientX
      mousePosition.current.y = event.clientY
    }

    document.addEventListener('mousemove', onMouseMove)

    return () => document.removeEventListener('mousemove', onMouseMove)
  }, [])

  return mousePosition.current
}
