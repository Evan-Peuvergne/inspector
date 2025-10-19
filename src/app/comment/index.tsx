import {
  useFloating,
  autoUpdate,
  autoPlacement,
  offset
} from "@floating-ui/react-dom"

import * as Styles from "./styles"

export interface CommentProps {
  position: { x: number; y: number }
}

export const Comment = ({ position }: CommentProps) => {
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [autoPlacement({ alignment: "start" }), offset({ mainAxis: 4 })]
  })

  return (
    <>
      <Styles.Anchor x={position.x} y={position.y} ref={refs.setReference} />
      <Styles.Overlay ref={refs.setFloating} style={floatingStyles} />
    </>
  )
}
