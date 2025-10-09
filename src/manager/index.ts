import { DOMManagerMode } from "./modes/base"
import { NavigateMode } from "./modes/navigate"
import { CommentMode } from "./modes/comment"

import type { Modes, DOMManagerEvents, Comment } from "./types"

export const MODES: { [key in Modes]: typeof DOMManagerMode } = {
  navigate: NavigateMode,
  comment: CommentMode
} as const

export class DOMManager {
  private currentMode: DOMManagerMode
  private modes: Record<Modes, DOMManagerMode>
  private comments: Comment[] = []

  private eventListeners: Map<keyof DOMManagerEvents, Set<Function>> = new Map()

  public $backdrop: HTMLElement | null = null

  constructor() {
    this.modes = {
      navigate: new NavigateMode(this),
      comment: new CommentMode(this)
    }

    this.currentMode = this.modes.navigate
    this.currentMode.activate()
  }

  getCurrentModeID(): Modes {
    return this.currentMode.id
  }

  setMode(mode: Modes): void {
    const newMode = this.modes[mode]
    if (!newMode) return

    this.currentMode.deactivate()
    this.currentMode = newMode
    this.currentMode.activate()

    this.emit("modeChanged", mode)
  }

  setBackdrop($backdrop: HTMLElement | null) {
    this.$backdrop = $backdrop
  }

  getComments(): Comment[] {
    return this.comments
  }

  setComments(comments: Comment[]): void {
    this.comments = comments
  }

  on<K extends keyof DOMManagerEvents>(
    event: K,
    listener: DOMManagerEvents[K]
  ): void {
    if (!this.eventListeners.has(event))
      this.eventListeners.set(event, new Set())
    this.eventListeners.get(event)!.add(listener)
  }

  off<K extends keyof DOMManagerEvents>(
    event: K,
    listener: DOMManagerEvents[K]
  ): void {
    this.eventListeners.get(event)?.delete(listener)
  }

  emit<K extends keyof DOMManagerEvents>(
    event: K,
    ...args: Parameters<DOMManagerEvents[K]>
  ): void {
    this.eventListeners.get(event)?.forEach((listener) => {
      listener(...args)
    })
  }

  destroy(): void {
    this.currentMode.deactivate()
    this.eventListeners.clear()
  }
}
