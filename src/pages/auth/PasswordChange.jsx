import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { encryptionService } from "../../utils/encryptionService";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/users/userSlice";

const PasswordChange = () => {
  const { user } = useSelector((state) => state.user); // Get user from redux (email here)
  const dispatch = useDispatch();

  // Formik setup for Password Change
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string().required("Old password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must include at least one uppercase letter")
        .matches(/[a-z]/, "Password must include at least one lowercase letter")
        .matches(/\d/, "Password must include at least one number")
        .matches(/[@$!%*?&#]/, "Password must include at least one special character")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        const payload = {
          email: user.email,
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        };
        const encryptedData = await encryptionService.encryptData(JSON.stringify(payload));
        await dispatch(changePassword(encryptedData)).unwrap();
        toast.success("Password changed successfully!");
        resetForm(); // Reset the form on success
      } catch (error) {
        toast.error(error.message || "Something went wrong!");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="max-w-xl w-full bg-white rounded-md p-6 border shadow-custom-blue-strong">
        <h2 className="text-2xl text-gray-800 font-bold text-center mb-4">Change Password</h2>
        <Formik
          initialValues={formik.initialValues}
          validationSchema={formik.validationSchema}
          onSubmit={formik.handleSubmit}
        >
          {() => (
            <Form className="space-y-6 mt-6">
              {/* Old Password */}
              <div>
                <label htmlFor="oldPassword" className="block text-xl font-medium text-gray-700">Old Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 mt-1 rounded-none border-2 border-indigo-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
                {formik.touched.oldPassword && formik.errors.oldPassword && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.oldPassword}</div>
                )}
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-xl font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 mt-1 rounded-none border-2 border-indigo-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-xl font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-3 mt-1 rounded-none border-2 border-indigo-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
                )}
              </div>

              {/* Submit Button */}
              <div className="mb-4">
                <div className="text-center flex space-x-2">
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="py-2 px-6 bg-indigo-600 text-white font-bold border border-indigo-800 rounded-none hover:bg-indigo-900 disabled:bg-indigo-300"
                  >
                    CHANGE PASSWORD
                  </button>
                  <Link 
                    to="/dashboard" 
                    className="inline-block text-indigo-600 font-bold px-6 py-2 cursor-pointer border border-indigo-800 rounded-none hover:bg-indigo-100 hover:text-indigo-700"
                  >
                    CANCEL
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

export default PasswordChange;
