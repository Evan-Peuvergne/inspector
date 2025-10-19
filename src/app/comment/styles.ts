import styled from "@emotion/styled"

const COMMENT_RADIUS = 16

export const Anchor = styled.span<{ x: number; y: number }>`
  position: absolute;
  left: ${(p) => p.x - COMMENT_RADIUS / 2}px;
  top: ${(p) => p.y - COMMENT_RADIUS / 2}px;
  width: ${COMMENT_RADIUS}px;
  height: ${COMMENT_RADIUS}px;
  background: red;
  border-radius: 100%;
`

export const Overlay = styled.div`
  display: block;
  width: 280px;
  height: 180px;
  background: #fff;
  outline: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
`
