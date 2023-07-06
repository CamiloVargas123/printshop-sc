"use client"

import { Toaster as RadToaster } from "sonner"

export function Toaster() {
  return (
    <RadToaster
      position="bottom-right"
      duration={5000}
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
        },
      }}
    />
  )
}
