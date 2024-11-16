import ReactDOM from 'react-dom'
import loadingImg from '../../assets/loader.gif'

const Loader = () => {
return (
    ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
      <div>
        <img src={loadingImg} alt="loading ...." />
      </div>
    </div>,
    document.getElementById('loader') // Ensure this exists in your DOM
    ))
};


export const Spinner = () => { 
  return (
    <div className="flex justify-center items-center flex-col w-full m-auto text-center inset-0">
      <img src={ loadingImg} alt="Loading ...." />
    </div>
  );
}

export default Loader;