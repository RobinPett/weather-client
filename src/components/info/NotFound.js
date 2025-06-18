/**
 * 404 page - displays when a resource cannot be found.
 *
 * @returns {JSX.Element} - The NotFound component.
 */
const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Not found</h2>
      <p>That resource does not exist</p>
    </div>
  )
}
 
export default NotFound