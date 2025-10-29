import { useState, useEffect, useRef } from "react"

import * as Styles from "./styles"
import { Comment } from "./comment"

import { useMode, useComments, useDrafts, getManager } from "~manager/context"

export const App = () => {
  const [mode, setMode] = useMode()
  const { comments } = useComments()
  const [current, setCurrent] = useState<string | null>(null)

  const manager = getManager()
  const $backdrop = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    getManager().setBackdrop($backdrop.current)
    return () => getManager().setBackdrop(null)
  }, [])

  const { draft, reset, confirm } = useDrafts()

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
        {comments.map((c) => (
          <Comment
            data={c}
            opened={c.id === current}
            onAnchorClick={(s) => (s ? setCurrent(null) : setCurrent(c.id))}
            onClose={() => setCurrent(null)}
            onSubmit={console.log}
            key={c.id}
          />
        ))}
        {draft && (
          <Comment
            opened
            data={draft}
            onClose={() => reset()}
            onSubmit={(c) => {
              confirm(c)
              setMode("navigate")
            }}
          />
        )}
      </Styles.Stage>
      <Styles.Backdrop
        $intercept={mode !== "navigate" || !!draft || !!current}
        ref={$backdrop}
      />
    </Styles.Container>
  )
}
