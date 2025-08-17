import type { Modes } from "~manager"

export abstract class DOMManagerMode {
  abstract readonly id: Modes

  public activate() {
    console.log(`Activating mode: ${this.id}`)
  }

  public deactivate() {
    console.log(`Deactivating mode: ${this.id}`)
  }
}
