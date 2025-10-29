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
  pointer-events: all;
  cursor: pointer;
`

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 180px;
  background: #fff;
  outline: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  overflow: hidden;
  pointer-events: all;

  textarea {
    flex: 1 1 auto;
    appearance: none;
    border: none;
  }

  button {
    display: block;
    height: 48px;
    padding: 0 12px;
    cursor: pointer;
  }
`
