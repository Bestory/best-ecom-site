import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/index';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/header';
import Footer from './components/footer';
import { Spinner } from './components/loader/loader';
import { EncryptionProvider } from './utils/EncryptionContext'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLogInStatus } from './redux/users/userSlice';
import Profile from './pages/profile/profile';
import Order from './pages/order/order';
import ActivatePage from './pages/auth/ActivatePage';
import ResetActivation from './pages/auth/ResetActivation';
import MFAEmailStepUp from './pages/auth/MFAEmailStepUp ';
import PasswordReset from './pages/auth/PasswordReset';
import PasswordChange from './pages/auth/PasswordChange';
import SetNewPassword from './pages/auth/SetNewPassword';


const App = () => {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLogInStatus());
  }, [dispatch])

  return (
    <EncryptionProvider>
      <BrowserRouter>
        <ToastContainer/>
        <Header />
        {/* <Spinner/> */}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/myorder' element={<Order />} />
          <Route path='/' element={<Home />} />
          <Route path='/activate' element={<ActivatePage />} />
          <Route path='/resettoken' element={<ResetActivation />} />
          <Route path='/mfaemailstepup' element={<MFAEmailStepUp />} />
          <Route path='/passwordreset' element={<PasswordReset />} />
          <Route path='/changepassword' element={<PasswordChange />} />
          <Route path='/setpassword' element={<SetNewPassword/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </EncryptionProvider>
  )
}
export default App
