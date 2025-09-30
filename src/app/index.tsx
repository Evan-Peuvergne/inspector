import { useState, useEffect, useRef } from "react"

import * as Styles from "./styles"

import { useMode, getManager } from "~manager/context"

export const App = () => {
  const [mode, setMode] = useMode()

  const manager = getManager()
  const $backdrop = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    getManager().setBackdrop($backdrop.current)
    return () => getManager().setBackdrop(null)
  }, [])

  return (
    <Styles.Container>
      <Styles.Toolbar>
        <Styles.ToolbarButton
          active={mode === "navigate"}
          onClick={() => setMode("navigate")}>
          Navigate
        </Styles.ToolbarButton>
        <Styles.ToolbarButton
          active={mode === "comment"}
          onClick={() => setMode("comment")}>
          Comment
        </Styles.ToolbarButton>
      </Styles.Toolbar>
      <Styles.Stage>
        <Styles.Comment style={{ left: 280, top: 100 }} />
      </Styles.Stage>
      <Styles.Backdrop $intercept={mode !== "navigate"} ref={$backdrop} />
    </Styles.Container>
  )
}
