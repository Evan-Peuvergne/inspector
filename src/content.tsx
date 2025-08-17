import type { PlasmoCSConfig } from "plasmo"

import { useEffect, useState } from "react"
import { Suspense, lazy } from "react"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"

import { ManagerProvider } from "~manager/context"

import { App } from "~content"

const styleElement = document.createElement("style")
const styleCache = createCache({
  key: "plasmo-emotion-cache",
  prepend: true,
  container: styleElement
})
export const getStyle = () => styleElement

export default () => {
  const [visible, setVisible] = useState(
    new URL(window.location.href).searchParams.get("inspector") === "enabled" ||
      false
  )

  const _onMessage = (m: any) =>
    m.type === "TOGGLE_EXTENSION" && setVisible((v) => !v)

  useEffect(() => {
    chrome.runtime.onMessage.addListener(_onMessage)
    return () => chrome.runtime.onMessage.removeListener(_onMessage)
  }, [])

  return (
    <CacheProvider value={styleCache}>
      {visible && (
        <ManagerProvider>
          <App />
        </ManagerProvider>
      )}
    </CacheProvider>
  )
}

export const config: PlasmoCSConfig = {
  matches: ["https://matera.eu/*"]
}
