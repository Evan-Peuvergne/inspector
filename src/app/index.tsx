import { useState } from "react"

import * as Styles from "./styles"

import { useMode } from "~manager/context"

export const App = () => {
  const [mode, setMode] = useMode()

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
    </Styles.Container>
  )
}
