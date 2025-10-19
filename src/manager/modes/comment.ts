import { DOMManagerMode } from "./base"

export class CommentMode extends DOMManagerMode {
  readonly id = "comment"

  public activate(): void {
    super.activate()

    this.manager.$backdrop.addEventListener("click", this._onStageClick, true)
  }

  public deactivate(): void {
    super.deactivate()

    this.manager.$backdrop.removeEventListener(
      "click",
      this._onStageClick,
      true
    )
  }

  _onStageClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    this.manager.emit("draftRequested", {
      type: "comment",
      position: {
        x: window.scrollX + e.clientX,
        y: window.scrollY + e.clientY
      }
    })
  }
}
