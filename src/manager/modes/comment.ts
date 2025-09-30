import { DOMManagerMode } from "./base"

export class CommentMode extends DOMManagerMode {
  readonly id = "comment"

  public activate(): void {
    super.activate()

    this.manager.on("stageClick", this._onStageClick)
  }

  public deactivate(): void {
    super.deactivate()

    this.manager.off("stageClick", this._onStageClick)
  }

  _onStageClick = (e: MouseEvent) => {
    const position = { x: e.offsetX, y: e.offsetY }
    console.log(position)
  }
}
