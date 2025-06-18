import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls user to the top of the page.
 * 
 * @param {Array|Object} children - The component props.
 * @returns {JSX.Element} - The ScrollToTop component.
 */
function ScrollToTop({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return children
}

export default ScrollToTop