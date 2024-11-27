import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { encryptionService } from "../../utils/encryptionService";
import { useDispatch } from "react-redux";
import { generateOTP, verifyOTP } from "../../redux/users/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MfaEmailPage = () => {
  const navigate = useNavigate();
  const { user,loggedIn,error } = useSelector((state) => state.user); // Replace with dynamic user email
  const dispatch = useDispatch();

  // Formik setup for OTP submission
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("OTP is required").length(8, "OTP must be 8 digits"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log('values',values)
      try {
        setSubmitting(true);
        values.email = user.email
        const encryptedData = await encryptionService.encryptData(JSON.stringify(values));
        await dispatch(verifyOTP(encryptedData)).unwrap();
        resetForm(); // Resets form after success
      } catch (error) {
        toast.error(error.message || "Something went wrong!");
      } finally {
        setSubmitting(false); // Ensures the loading state is reset
      }
    }
  });

  const handleSendOtp = async (values, formikHelpers) => {
    const { resetForm } = formikHelpers;
    const encryptedData = await encryptionService.encryptData(JSON.stringify(values));
    await dispatch(generateOTP(encryptedData))
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (!user || error) {
    navigate("/login")
    }
    if (loggedIn ) { 
      navigate("/")
    }
  }, [navigate, user,loggedIn,error]);
  
  // Early return to avoid rendering the component while user is null
  if (!user) {
    return null; // Render nothing or a loading spinner if needed
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="max-w-xl w-full bg-white rounded-md p-6 border shadow-custom-blue-strong">
          <h2 className="text-2xl text-gray-800 font-bold text-center mb-4">
            Multi-Factor Authentication - EMAIL
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Please select "SEND OTP" to send the One-Time Password (OTP) to your registered email address. The OTP is only valid for 10 minutes.
          </p>

          {/* Email address */}
          <div className="mb-4">
            <p className="text-gray-600">Your OTP will be sent to the following email address:</p>
            <p className="font-bold text-gray-800 border border-indigo-200 p-2 rounded-none bg-slate-100">{user.email || "b*******@ubx.co.tz"}</p> {/* Dynamic email */}
          </div>

          {/* Button and "Update Email Address" link */}
          <div className="flex items-center mb-4">
          <form onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload
            handleSendOtp({ email: user.email }, formik);
          }}>
            <button
              type="submit"
              className="w-auto px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md border rounded-none hover:bg-indigo-700"
            >
              SEND OTP
            </button>
          </form>
            <Link to="/profile" 
              className="ml-4 text-indigo-600 font-semibold cursor-pointer hover:text-indigo-700"
            >
              Update Email Address
            </Link>
          </div>

          {/* OTP input */}
            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                One-Time Password
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 mt-1 rounded-none border-2 border-indigo-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                placeholder="Enter your OTP"
              />
              {formik.touched.otp && formik.errors.otp && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.otp}</div>
              )}
            </div>

          {/* Submit Button Container */}
          <div className="mb-4">
            <div className="text-center flex">
              <button
                type="submit"
                onClick={formik.handleSubmit} // Trigger form submission
                disabled={formik.isSubmitting}
                // disabled={!otpSent || otpValid || formik.isSubmitting}
                className="py-2 px-6 bg-indigo-600 text-white font-bold border border-indigo-800 rounded-none hover:bg-indigo-900 disabled:bg-indigo-300"
              >
                  SUBMIT
              </button>
              
              {/* Home Button */}
              <div className="text-center">
                <Link 
                  to="/" 
                  className="inline-block text-indigo-600 font-bold px-6 py-2 cursor-pointer border border-indigo-800 rounded-none hover:bg-indigo-100 hover:text-indigo-700"
                >
                  HOME
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MfaEmailPage;
