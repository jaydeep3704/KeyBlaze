// context/TypingContext.tsx
"use client"
import { createContext, useContext, useState, ReactNode } from "react"

type Mode = "time" | "words"

type TypingContextType = {
  mode: Mode
  selectedValue: number
  setMode: (mode: Mode) => void
  setSelectedValue: (value: number) => void
}

const TypingContext = createContext<TypingContextType | undefined>(undefined)

export function TypingProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("time")
  const [selectedValue, setSelectedValue] = useState<number>(15)

  return (
    <TypingContext.Provider value={{ mode, selectedValue, setMode, setSelectedValue }}>
      {children}
    </TypingContext.Provider>
  )
}

export function useTyping() {
  const context = useContext(TypingContext)
  if (!context) {
    throw new Error("useTyping must be used within a TypingProvider")
  }
  return context
}
