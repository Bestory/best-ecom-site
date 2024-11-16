import { useEffect } from 'react';
import loginImage from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FloatingLabelInput from "../../utils/inputUtil.jsx";
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { login,RESET_USER } from "../../redux/users/userSlice.js";
import { toast } from "react-toastify";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/loader.jsx";
import { useEncryption } from '../../utils/EncryptionContext';
import { encryptionService } from '../../utils/encryptionService';
// import { useLocation } from 'react-router-dom';

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const initialValues = {
  email: "",
  password: ""
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, loggedIn} = useSelector((state) => state.user);
  const { isKeyLoaded } = useEncryption();

  const handleFormSubmit = async (values, { resetForm }) => {
  if (!isKeyLoaded) {
    toast.error('No crypto value loaded');
      return;
    }
    // Encrypt data before sending
    const encryptedData = await encryptionService.encryptData(JSON.stringify(values)); // Assuming encryptData method is available
    await dispatch(login(encryptedData))
      .unwrap()
      .then(() => {
        resetForm(); // Resets form after successful submission
      }).catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (success && loggedIn) {
      navigate('/')
    }
    dispatch(RESET_USER())
  }, [success, dispatch, navigate,loggedIn]);
  
  return (
    <>
    {loading && <Loader />}
      <section className="w-full mt-0 pt-0 min-h-[80vh] flex justify-center items-center sm:flex-col md:flex-row bg-primary">
      <div className='flex bg-slate-50 p-2 rounded'>
        <div className="flex rounded justify-end items-center animate-slide-down mr-1 h-full pr-0">
          <img src={loginImage} alt="login" width={460} />
        </div>
        <Card CardClass="right-0 flex justify-start items-center px-10 py-18 sm:py-8 md:py-12 ml-1 border: '1px solid #030b6b' shadow-custom-strong">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-3xl text-center font-semibold text-red-600 mb-6">Sign In</h2>
            <Formik
                  initialValues={initialValues}
                  validationSchema={loginSchema}
                  onSubmit={handleFormSubmit}
            >
                  {({ handleBlur, handleChange,values, errors, touched }) => (
                    <Form className="w-full max-w-md flex flex-col gap-5">  
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
                    <button
                      type='submit'
                      disabled = {loading}
                      className={loading? `mt-2 bg-blue-300 w-full p-1  text-white rounded-md uppercase hover:opacity-95 disabled:opacity-80`:`bg-blue-500 w-full p-1  text-white rounded-md uppercase hover:opacity-95 disabled:opacity-80`}>
                        {loading ?  'Loading ...' : 'Sign In'}
                    </button>
                    </Form>
                  )}
              </Formik>
              <div className='mt-2 p-1 w-full flex items-center justify-between'>
                <div className='flex items-center'>
                  <input type='checkbox' id='remember-this' name='remember-this'
                    className='w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded' />
                      <label htmlFor='remember-this' className='ml-2 block text-sm text-blue-500 font-bold'>Remember Me</label>
                </div>
                  <Link to='/reset-password' className='text-blue-500 text-sm font-bold hover:text-blue-800'>
                    Forget Password?
                  </Link>
              </div>
              <span className="p-1 w-full flex justify-end items-center mt-1">
                <p className="text-center m-4 text-blue-400 font-bold">Dont have an account?</p>        
                <Link to = '/register'>
                  <span className='text-blue-500 font-bold'>Sign Up</span>
                </Link> 
              </span>
          </div>
        </Card>
        </div>
    </section>
    </>
  )}


export default Login