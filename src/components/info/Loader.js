/**
 * Displays when something loads.
 * 
 * @param {boolean} blur - Whether to blur the background or not.
 * @returns {JSX.Element} - The Loader component.
 */
const Loader = ({blur}) => {
  return (
    <div className={blur ? 'fixed items-center backdrop-blur-sm top-0 left-0 w-full h-full z-10 bg-white bg-opacity-50 flex justify-center' : 'hidden'}>
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>
    </div>
  )
}

export default Loader