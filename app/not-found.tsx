'use client'

// import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
// import { MoonIcon, SunIcon } from "lucide-react"
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  // const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center transition-colors duration-200 bg-background">
      <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
      <p className="mb-8 text-xl text-muted-foreground">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <div className="space-y-4">
        <Button asChild className="px-6 py-2">
          <Link href="/">Go back home</Link>
        </Button>
        <div>
          {/* <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button> */}
        </div>
      </div>
      <div className="mt-12 animate-bounce">
        <div className="w-16 h-16 border-4 border-primary border-dashed rounded-full animate-spin"></div>
      </div>
    </div>
  )
}