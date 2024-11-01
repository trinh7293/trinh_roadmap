import { XYPosition } from '@xyflow/react'

const isValidCoordinate = (cor: number | null) => {
  return cor != null && !isNaN(cor)
}

export const isValidPosition = (position: XYPosition) => {
  const { x, y } = position
  if (isValidCoordinate(x) && isValidCoordinate(y)) {
    return true
  }
  return false
}
