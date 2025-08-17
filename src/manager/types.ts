export type Modes = "navigate" | "comment"

export interface DOMManagerEvents {
  modeChanged: (newMode: Modes) => void
}
