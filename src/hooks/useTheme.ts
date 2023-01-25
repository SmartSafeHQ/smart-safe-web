import { useEffect, useState } from 'react'

type Themes = 'dark' | 'light'

const useTheme = () => {
  const [theme, setTheme] = useState<Themes>('light')

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')

      return
    }

    setTheme('light')
    localStorage.setItem('theme', 'light')
    document.documentElement.classList.remove('dark')
  }

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme')
    const isDarkThemePreferred =
      !('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches

    if (localStorageTheme === 'dark' || isDarkThemePreferred) {
      document.documentElement.classList.add('dark')
      setTheme('dark')

      return
    }

    document.documentElement.classList.remove('dark')
    setTheme('light')
  }, [])

  return {
    theme,
    toggleTheme
  }
}

export default useTheme
