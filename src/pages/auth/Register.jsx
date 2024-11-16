import Card from "../../components/card/Card";
import RegisterImage from "../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register, RESET_USER } from "../../redux/users/userSlice.js";
import FloatingLabelInput from "../../utils/inputUtil.jsx";
import { toast } from "react-toastify";
import Loader from "../../components/loader/loader.jsx";
import { encryptionService} from '../../utils/encryptionService.js'

const registerSchema = yup.object().shape({
  fName: yup.string().required("First Name is required"),
  lName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
  cPassword: yup.string().oneOf([yup.ref('password')], "Passwords must match").required("Confirm Password is required"),
});

const initialValuesRegister = {
  fName: "",
  lName: "",
  email: "",
  password: "",
  cPassword: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, loading,registered } = useSelector((state) => state.user);
  const handleFormSubmit = async (values, { resetForm }) => {
     // Encrypt data before sending
    const encryptedData = await encryptionService.encryptData(JSON.stringify(values)); // Assuming encryptData method is available
    dispatch(register(encryptedData))
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    console.log('registered',registered);
    if (registered) {
      navigate('/activate');
    } 
    dispatch(RESET_USER());
  }, [success, dispatch, navigate,registered]);

  return (
    <>
      {loading && <Loader />}
      <section className="w-full mt-0 pt-0 min-h-[90vh] flex justify-center items-center sm:flex-col md:flex-row bg-primary">
        <div className='flex bg-slate-50 p-2 rounded'>
           <Card CardClass="right-0 h-full flex justify-start items-center px-10 py-18 sm:py-8 md:py-12 ml-1 shadow-custom-strong">
            <div className="w-full flex flex-col items-center">
              <h2 className="text-3xl text-center font-semibold text-red-600 mb-6">Sign Up</h2>     
              <Formik
                initialValues={initialValuesRegister}
                validationSchema={registerSchema}
                onSubmit={handleFormSubmit}
              >
                {({ handleBlur, handleChange, values, errors, touched }) => (
                  <Form className="w-full max-w-md flex flex-col gap-5">
                    <FloatingLabelInput
                      label="First Name"
                      name="fName"
                      type="text"
                      value={values.fName}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      error={Boolean(touched.fName && errors.fName)}
                      helperText={touched.fName && errors.fName}
                    />
                    <FloatingLabelInput
                      label="Last Name"
                      name="lName"
                      type="text"
                      value={values.lName}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      error={Boolean(touched.lName && errors.lName)}
                      helperText={touched.lName && errors.lName}
                    />
                    <FloatingLabelInput
                      label="Email"
                      name="email"
                      type="email"
                      value={values.email}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <FloatingLabelInput
                      label="Password"
                      name="password"
                      type="password"
                      value={values.password}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      showEyeIcon='true'
                    />
                    <FloatingLabelInput
                      label="Confirm Password"
                      name="cPassword"
                      type="password"
                      value={values.cPassword}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      error={Boolean(touched.cPassword && errors.cPassword)}
                      helperText={touched.cPassword && errors.cPassword}
                      showEyeIcon='true'
                    />
                    <button
                      type="submit"
                      className={loading? `bg-gray-500`: `w-full text-white bg-blue-500 font-normal p-1 border-transparent border-solid border rounded-lg cursor-pointer flex justify-center items-center transition-all duration-300`}
                    >
                      {loading ? 'Loading ...' : 'Sign Up'}
                    </button>
                  </Form>
                )}
              </Formik>
              <span className="flex justify-center items-center mt-1">
                <p className="text-center m-2">Already registered?</p>
                <Link to="/login" className="text-blue-500 underline">Sign In</Link>
              </span>
            </div>
          </Card>
          <div className="flex justify-end items-center animate-slide-down mr-1 h-full pr-0 pl-2">
            <img src={RegisterImage} alt="register" width={500} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;