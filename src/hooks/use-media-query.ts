
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    
    const handleChange = () => {
      setMatches(mediaQuery.matches)
    }

    // Set initial state
    handleChange()

    // Add event listener
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup event listener
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
