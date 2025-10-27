export type Position = {
  x: number
  y: number
}

export type Anchor = {
  position: Position
  target: string
}

export type Comment = {
  id: string
  position: Position
  content: string
}
