import { useDispatch, useSelector } from 'react-redux';
import { activateAccount } from '../../redux/users/userSlice.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { encryptionService } from '../../utils/encryptionService.js'
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { RESET_USER } from "../../redux/users/userSlice.js";
// import { useState } from 'react';
// import { useEffect } from 'react';

const ActivatePage = () => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const [showError, setShowError] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    activationCode: Yup.string()
      .required('Activation code is required')
      .min(6, 'Activation code must be at least 6 characters long'),
  });

  // Initial values for Formik
  const initialValues = {
    activationCode: '',
  };

    const handleActivation = async (values, { resetForm }) => {
     // Encrypt data before sending
      const encryptedData = await encryptionService.encryptData(JSON.stringify(values)); // Assuming encryptData method is available
      
      // setShowError(true); // Show the error message when the button is clicked
      await dispatch(activateAccount(encryptedData))
      .unwrap()
        .then(() => {  
        resetForm();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (success) {
      navigate('/login');
    }
    dispatch(RESET_USER());
  }, [success, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="max-w-md w-full bg-white rounded-md p-6 border: '1px solid #030b6b shadow-custom-blue-strong">
        <h2 className="text-2xl text-gray-800 rounded font-bold text-center mb-4">
          Account Activation Form
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter the activation code sent to your email.
        </p>
        {/* {error && showError && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
            {error}
          </div>
        )} */}

        {success ? (
          <div className="text-center text-green-600">
            Your account has been activated successfully!
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleActivation}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="activationCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Activation Code
                  </label>
                  <Field
                    type="text"
                    name="activationCode"
                    id="activationCode"
                    placeholder="Enter your activation code"
                    className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                  />
                  <ErrorMessage
                    name="activationCode"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                    loading
                      ? 'bg-indigo-300 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {loading ? 'Activating...' : 'Activate Account'}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ActivatePage;
