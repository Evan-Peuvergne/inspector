import type { DOMManager, Modes } from "~manager"

export abstract class DOMManagerMode {
  abstract readonly id: Modes
  protected manager: DOMManager

  constructor(manager: DOMManager) {
    this.manager = manager
  }

  public activate() {
    console.log(`Activating mode: ${this.id}`)
  }

  public deactivate() {
    console.log(`Deactivating mode: ${this.id}`)
  }
}
