import { useState, useEffect, useRef } from "react"
import { useFloating } from "@floating-ui/react-dom"
import { autoUpdate, autoPlacement, offset } from "@floating-ui/react-dom"

import * as Styles from "./styles"

export interface CommentProps {
  position: { x: number; y: number }
  onSubmit: (content: string) => void
}

export const Comment = ({ position, onSubmit }: CommentProps) => {
  const [value, setValue] = useState("")
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [autoPlacement({ alignment: "start" }), offset({ mainAxis: 4 })]
  })

  const $textarea = useRef<HTMLTextAreaElement>(null)

  useEffect(
    () => $textarea.current?.focus({ preventScroll: true }),
    [$textarea]
  )

  return (
    <>
      <Styles.Anchor x={position.x} y={position.y} ref={refs.setReference} />
      <Styles.Overlay ref={refs.setFloating} style={floatingStyles}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add comment ..."
          ref={$textarea}
        />
        <button onClick={() => onSubmit(value)}>Valider</button>
      </Styles.Overlay>
    </>
  )
}
