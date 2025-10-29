import { useEffect } from "react"

export function useClickOutside(
  $ref: React.RefObject<HTMLElement | null>,
  func: (e: MouseEvent) => void
) {
  const _handleClickOutside = (e: MouseEvent) => {
    const node = $ref.current
    if (!node) return
    if (e.composedPath().includes(node)) return

    const swallowNextClick = (clickEvent: MouseEvent) => {
      clickEvent.preventDefault()
      clickEvent.stopPropagation()
      clickEvent.stopImmediatePropagation()
      window.removeEventListener("click", swallowNextClick, true)
    }
    window.addEventListener("click", swallowNextClick, true)

    func(e)
  }

  useEffect(() => {
    window.addEventListener("pointerdown", _handleClickOutside, true)
    return () =>
      window.removeEventListener("pointerdown", _handleClickOutside, true)
  })

  return $ref
}
