import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { encryptionService } from "../../utils/encryptionService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCaptcha,
  RESET_USER,
  verifyCaptcha,
} from "../../redux/users/userSlice";

const PasswordReset = () => {
  const { user, changePassword } = useSelector((state) => state.user); // Get user from redux (email here)
  const dispatch = useDispatch();
  const [captchaSrc, setCaptchaSrc] = useState(null);
  const navigate = useNavigate();

  // Formik setup for OTP submission
  const formik = useFormik({
    initialValues: {
      username: user ? user.email : "", // Default to logged-in user's email
      otp: "",
      captcha: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .email("Invalid email address")
        .required("Username is required"),
      captcha: Yup.string().required("Verification code is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        const encryptedData = await encryptionService.encryptData(
          JSON.stringify(values)
        );
        await dispatch(verifyCaptcha(encryptedData)).unwrap();
        resetForm(); // Resets form after success
      } catch (error) {
        console.log(error.message || "Something went wrong!")
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Dynamic CAPTCHA refresh
  const refreshCaptcha = async () => {
    try {
      setCaptchaSrc(null);
      const email = formik.values.username; // Capture email from formik
      if (email) {
        const encryptedData = await encryptionService.encryptData(
          JSON.stringify({ email: email })
        );
        // Dispatch the action to get a new CAPTCHA with email
        const newCaptcha = await dispatch(getCaptcha(encryptedData)).unwrap();
        setCaptchaSrc(newCaptcha); // Assuming the CAPTCHA image is returned directly
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (changePassword) {
      navigate("/setpassword");
    }
    dispatch(RESET_USER());
  }, [navigate, dispatch, changePassword]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="max-w-xl w-full bg-white rounded-md p-6 border shadow-custom-blue-strong">
        <h2 className="text-xl text-gray-800 font-bold text-center mb-4">
          Password Reset
        </h2>
        <p className="mt-2 text-center text-xl text-gray-600">
          Enter your email and refresh CAPTCHA to get CAPTCHA code. OTP will be sent to the email.
        </p>
        <Formik
          initialValues={formik.initialValues}
          validationSchema={formik.validationSchema}
          onSubmit={formik.handleSubmit}
        >
          {() => (
            <Form className="space-y-6 mt-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-xl font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Email"
                  className="w-full p-3 mt-1 rounded-none border-2 border-indigo-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.username}
                  </div>
                )}
              </div>

              {/* OTP*/}
              <div className="mb-4">
                <label
                  htmlFor="captcha"
                  className="block text-xl font-normal text-gray-700"
                >
                  Enter OTP sent to your email
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 mt-1 rounded-none border-2 border-indigo-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
                {formik.touched.captcha && formik.errors.captcha && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.captcha}
                  </div>
                )}
              </div>
              {/* CAPTCHA Placeholder */}
              <div className="mb-4">
                <label
                  htmlFor="captcha"
                  className="block text-xl font-normal text-gray-700"
                >
                  Enter Captcha code displayed below
                </label>
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  value={formik.values.captcha}
                  onChange={formik.handleChange}
                  placeholder="Captcha"
                  onBlur={formik.handleBlur}
                  className="w-full p-3 mt-1 rounded-none border-2 border-indigo-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
                {formik.touched.captcha && formik.errors.captcha && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.captcha}
                  </div>
                )}
              </div>
              <div className="mt-2 flex items-center">
                <div
                  className="captcha-image"
                  dangerouslySetInnerHTML={{ __html: captchaSrc }}
                />
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  disabled={!formik.values.username || formik.errors.username}
                  className={`text-indigo-600 hover:underline text-xl ${
                    !formik.values.username || formik.errors.username
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Refresh CAPTCHA
                </button>
              </div>
              <div className="mb-4">
                <div className="text-center flex space-x-2">
                  <button
                    type="submit"
                    disabled={formik.isSubmitting || !formik.values.username || formik.errors.username
                      ||!formik.values.otp || formik.errors.otp || !formik.values.captcha || formik.errors.captcha}
                    className="py-2 px-6 bg-indigo-600 text-white font-bold border border-indigo-800 rounded-none hover:bg-indigo-900 disabled:bg-indigo-300"
                  >
                    CONTINUE
                  </button>
                  <Link
                    to="/login"
                    className="inline-block text-indigo-600 font-bold px-6 py-2 cursor-pointer border border-indigo-800 rounded-none hover:bg-indigo-100 hover:text-indigo-700"
                  >
                    BACK TO LOGIN
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PasswordReset;
