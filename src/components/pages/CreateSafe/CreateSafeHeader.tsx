import { Moon, Sun } from 'phosphor-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { SmartSafeIconLogo } from '@components/Logos/SmartSafeIconLogo'

export function CreateSafeHeader() {
  const { theme, setTheme } = useTheme()
  const [resolvedTheme, setResolvedTheme] = useState('dark')

  // Workaround, when mounted on client, now we can show the UI
  useEffect(() => setResolvedTheme(theme ?? 'dark'), [theme])

  return (
    <header className="sticky top-0 left-0 w-full h-16 z-10 bg-zinc-50 dark:bg-zinc-950">
      <nav className="h-16 flex items-center m-auto px-6 select-none relative">
        <div className="flex flex-1 items-center pr-6 z-50">
          <Link
            href="/home"
            className="block w-7 h-6 p-2 -m-2 box-content relative"
          >
            <SmartSafeIconLogo className="w-6 h-6" />
          </Link>
        </div>

        <div className="flex flex-grow-0 flex-shrink-0 items-center justify-end z-50">
          {resolvedTheme === 'dark' ? (
            <button
              onClick={() => setTheme('light')}
              className="p-2 flex items-center justify-center overflow-hidden border-1 border-zinc-700 rounded-full hover:border-zinc-500 hover:bg-zinc-900"
            >
              <Sun className="text-zinc-100" />
            </button>
          ) : (
            <button
              onClick={() => setTheme('dark')}
              className="p-2 flex items-center justify-center overflow-hidden border-1 border-zinc-600 rounded-full hover:border-zinc-800 hover:bg-zinc-200"
            >
              <Moon className="text-zinc-800" />
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
