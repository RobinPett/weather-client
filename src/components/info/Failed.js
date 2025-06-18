/**
 * Displays when something has failed.
 * @param {Object} props
 * @param {Function} props.onFailed - Function to call when the user clicks the button.
 * @returns {JSX.Element} - The Failed component.
 */
const Failed = ({ onFailed }) => {
  return (
    <div className="cc0-fail">
      <BiSolidError size={50}/>
      <h3>A problem occured while processing your request</h3>
      <button onClick={onFailed} className="cc0-button">Try again</button>
    </div>
  )
}
 
export default Failed;