import { useState, useEffect, useRef } from "react"
import { useFloating } from "@floating-ui/react-dom"
import { autoUpdate, autoPlacement, offset } from "@floating-ui/react-dom"
import { useClickOutside } from "~helpers/hooks/useClickOutside"

import * as Styles from "./styles"

import type { Comment as CommentData, Draft } from "~types"

export interface CommentProps {
  data: CommentData | Draft
  opened?: boolean
  onAnchorClick?: (opened: boolean) => void
  onClose?: () => void
  onSubmit: (content: string) => void
}

export const Comment = (props: CommentProps) => {
  const { data, opened } = props

  const [value, setValue] = useState(data.content || "")
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [autoPlacement({ alignment: "start" }), offset({ mainAxis: 4 })]
  })

  const $textarea = useRef<HTMLTextAreaElement>(null)

  useEffect(
    () => $textarea.current?.focus({ preventScroll: true }),
    [$textarea]
  )
  useClickOutside(refs.floating, () => props.onClose?.())

  return (
    <>
      <Styles.Anchor
        x={data.position.x}
        y={data.position.y}
        ref={refs.setReference}
        onClick={() => props.onAnchorClick?.(opened)}
      />
      {opened && (
        <Styles.Overlay ref={refs.setFloating} style={floatingStyles}>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add comment ..."
            ref={$textarea}
          />
          <button
            onClick={(e) => {
              props.onSubmit(value)
            }}>
            Valider
          </button>
        </Styles.Overlay>
      )}
    </>
  )
}
