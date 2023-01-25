import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'

type ThemeProviderProps = PropsWithChildren<Record<string, unknown>>

type Themes = 'dark' | 'light'

type ThemeContextData = {
  theme: Themes
  setTheme: (_theme: Themes) => void
  toggleTheme: () => void
}

const ThemeContext = createContext({} as ThemeContextData)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Themes>('light')

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
  }, [setTheme])

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

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
