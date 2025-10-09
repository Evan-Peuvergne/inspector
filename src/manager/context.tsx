import { useState, useEffect, useCallback } from "react"
import { createContext, useContext } from "react"

import { DOMManager } from "./"

import type { Modes, Comment } from "./types"
import { get } from "http"

interface DOMManagerContext {
  currentMode: Modes
  setMode: (mode: Modes) => void
  comments: Comment[]
}

const ManagerContext = createContext<DOMManagerContext | null>(null)

let managerInstance: DOMManager | null = null

export const getManager = (): DOMManager => {
  if (!managerInstance) managerInstance = new DOMManager()
  return managerInstance
}

export const ManagerProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [currentMode, setCurrentMode] = useState<Modes>("navigate")
  const [comments, setComments] = useState<Comment[]>(() =>
    getManager().getComments()
  )

  useEffect(() => {
    const manager = getManager()
    setCurrentMode(manager.getCurrentModeID())

    const handleModeChange = (newMode: Modes) => setCurrentMode(newMode)

    manager.on("modeChanged", handleModeChange)
    return () => manager.off("modeChanged", handleModeChange)
  }, [])

  useEffect(() => {
    const manager = getManager()
    const updateComments = (next) => setComments(next)

    manager.on("commentsChanged", updateComments)
    return () => manager.off("commentsChanged", updateComments)
  }, [])

  const setMode = useCallback((mode: Modes) => {
    const manager = getManager()
    manager.setMode(mode)
  }, [])

  return (
    <ManagerContext.Provider value={{ currentMode, setMode, comments }}>
      {children}
    </ManagerContext.Provider>
  )
}

export const useMode = (): [Modes, (newMode: Modes) => any] => {
  const ctx = useContext(ManagerContext)
  if (!ctx) throw new Error("useMode must be used within a ManagerProvider")

  return [ctx.currentMode, ctx.setMode]
}

export const useComments = () => {
  const ctx = useContext(ManagerContext)
  if (!ctx) throw new Error("useComments must be used within a ManagerProvider")

  return { comments: ctx.comments }
}
