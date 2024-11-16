import { useEffect, useState } from 'react';
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

const FloatingLabelInput = ({
  type,
  value,
  disabled,
  name,
  label,
  handleBlur,
  handleChange,
  error,
  helperText,
  showEyeIcon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [visible,setVisible] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlurCustom = (e) => {
    handleBlur(e);
    setIsFocused(false);
  };

  // Determine whether the label should remain on top based on focus or field value
  const shouldFloat = isFocused || value; // Ensure value is checked properly with !!

  return (
    <div className="relative">
      <input
        type={!visible? type:'text'}
        id={name}
        name={name}
        value={value} // Bind value for controlled input
        onBlur={handleBlurCustom}
        onFocus={handleFocus}
        onChange={handleChange}
        disabled={disabled|| undefined}
        className={`peer w-full p-1 bg-slate-100 border border-gray-500 rounded-md focus:outline-none  
          ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}
          ${shouldFloat ? 'pt-3' : 'py-1'}`} // Adds padding when label floats
        placeholder=" " // Adds placeholder to push up the label correctly
      />
      {showEyeIcon &&
      (visible ?
        (<AiOutlineEyeInvisible onClick={() => setVisible(false)} size='24px' className='absolute top-2 right-2  cursor-pointer' />) :
        (<AiOutlineEye onClick={() => setVisible(true)} size='24px' className='absolute top-2 right-2  cursor-pointer' />)
      )}
      <label
        htmlFor={name}
        className={`absolute left-2 px-1 text-gray-500 text-sm transition-all duration-300 ease-in-out bg-slate-100
          ${shouldFloat ? '-top-3 text-xs' : 'top-2 text-base'}
          ${error ? 'text-red-500' : 'text-gray-500'}`}
      >
        {label}
      </label>
      {helperText && <p className="text-sm text-red-500 mt-1">{helperText}</p>}
    </div>
  );
};

export default FloatingLabelInput;