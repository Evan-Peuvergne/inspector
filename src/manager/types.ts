export type Modes = "navigate" | "comment"

export type Position = { x: number; y: number }

export interface Comment {
  id: string
  position: Position
  content: string
}

export interface DOMManagerEvents {
  modeChanged: (newMode: Modes) => void
  commentsChanged: (comments: Comment[]) => void
}
