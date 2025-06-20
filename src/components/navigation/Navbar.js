import { NavLink } from 'react-router-dom'

/**
 * Navbar with links.
 *
 * @returns {JSX.Element} - The Navbar component.
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to='/' className="text-center text-red-600 font-bold">Weather App</NavLink>
      <div className="links">
        <NavLink exact activeClassName='cc0-link-active' className='cc0-link' to='/measurements'>Measurements</NavLink>
      </div>
    </nav> 
  )
}

export default Navbar