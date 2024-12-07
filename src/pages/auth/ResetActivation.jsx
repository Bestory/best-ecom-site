import { useDispatch, useSelector } from "react-redux";
import { resetActivationCode } from "../../redux/users/userSlice.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { encryptionService } from "../../utils/encryptionService.js";
import { toast } from "react-toastify";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { RESET_USER } from "../../redux/users/userSlice.js";

const ResetActivation = () => {
  const dispatch = useDispatch();
  const { loading, activateToken } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const hasNavigatedRef = useRef(false); // Tracks if navigation has occurred
  const [hasNavigated, setHasNavigated] = useState(false); // Local flag to prevent redundant navigation

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  // Initial values for Formik
  const initialValues = {
    email: "",
  };

  const handleResetActivation = async (values, { resetForm }) => {
    const encryptedData = await encryptionService.encryptData(JSON.stringify(values));
    await dispatch(resetActivationCode(encryptedData))
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    // console.log("useEffect triggered", { activateToken, hasNavigated: hasNavigated });
    if (activateToken) {
      setHasNavigated(true); // Mark navigation as complete
      navigate("/activate");
    }

    return () => {
      if (hasNavigated) {
        setHasNavigated(false);
        dispatch(RESET_USER()); // Reset state only after navigation
      }
    };
  }, [activateToken, navigate, dispatch,hasNavigated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="max-w-md w-full bg-white rounded-md p-6 border shadow-custom-blue-strong">
        <h2 className="text-2xl text-gray-800 font-bold text-center mb-4">
          Reset Activation Code
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter your email to receive a new activation code.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleResetActivation}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={loading || isSubmitting || !isValid || !dirty}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                  loading || isSubmitting || !isValid || !dirty
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading ? "Sending Request..." : "Reset Activation Code"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetActivation;
