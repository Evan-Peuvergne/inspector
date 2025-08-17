import styled from "@emotion/styled"

const BORDER = 4

export const Comment = styled.span`
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  background: red;
`

export const Stage = styled.div`
  position: absolute;
  z-index: 999999999999;
  pointer-events: none;
`

export const ToolbarButton = styled.button<{ active?: boolean }>`
  width: 88px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: ${(p) => (p.active ? "#fff" : "rgba(255, 255, 255, 0.8)")};
  border: none;
  background: ${(p) => (p.active ? "rgba(255, 255, 255, 0.16)" : "none")};
  appearance: none;
  cursor: pointer;
`

export const Toolbar = styled.div`
  position: fixed;
  z-index: 999999999999;
  top: calc(100vh - 4px);
  left: 50vw;
  transform: translate3d(-50%, -100%, 0);
  display: flex;
  gap: 4px;
  padding: 8px 8px 4px 8px;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(8px);
  pointer-events: all;
`

export const Container = styled.div`
  pointer-events: none;
  &:after {
    position: fixed;
    z-index: 999999999999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 4px solid rgba(0, 0, 0, 0.88);
    content: "";
  }
`
