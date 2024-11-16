import ReactDOM from 'react-dom'

const PercentageDisplay = ({ percent }) => {
  return (
      ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
          <div>
            {percent > 0 && percent < 100 ? (<span className='rounded text-white mb-4 p-4 bg-primary'>{`Uploading image ${percent} %`}</span>) : percent === 100? (<span className='bg-green-500 text-white font-bold rounded mb-4 p-4'>image uploaded succefully</span>): '' }
            </div>
      </div>,
      document.getElementById('loader') // Ensure this exists in your DOM
    )
  ) 
};
export default PercentageDisplay;