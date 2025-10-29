export type Modes = "navigate" | "comment"

import type { Comment, Position } from "~types"

export interface DOMManagerEvents {
  modeChanged: (newMode: Modes) => void
  commentsChanged: (comments: Comment[]) => void
  draftRequested: (position: Position) => void
}
