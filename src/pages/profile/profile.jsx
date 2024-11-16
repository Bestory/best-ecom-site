import Card from "../../components/card/Card.jsx"
import PageMenu from "../../components/pageMenu/pagemenu"
import { Formik, Form } from 'formik';
import FloatingLabelInput from "../../utils/inputUtil.jsx";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUser,updatePhoto } from "../../redux/users/userSlice.js";
import { toast } from "react-toastify";
import Loader from "../../components/loader/loader.jsx";
import PercentageDisplay from "../../components/loader/displayPercent.jsx"
import { encryptionService} from '../../utils/encryptionService.js'
import { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../utils/firebase.js'
// import { RESET_USER } from "../../redux/users/userSlice.js";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const registerSchema = yup.object().shape({
  fName: yup.string().required("First Name is required"),
  lName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Last Name is required"),
  photo: yup.string().required("Last Name is required"),
  address: yup.object().shape({
  address: yup.string().optional(""),
  state: yup.string().optional(""),
  country: yup.string().optional("")
})
});

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [previewProfileImage, setPreviewProfileImage] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const [upload,setUpload] = useState(false);
  const { loading, user, loggedIn } = useSelector((state) => state.user);
  const [percentUpload, setPercentUpload] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);  // Ref to the file input element

  const initialValues = {
    fName: user?.fName || "",
    lName: user?.lName || "",
    email: user?.email || "",
    role: user?.role || "",
    photo: user?.photo || "",
    phone: user?.phone || "",
    status: user?.status || "",
    address: user?.address || {}
  }

  const saveImageToFireBaseStore = async () => {
  try {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + profileImage.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, profileImage);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',(snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentUpload(Math.round(progress));
          setUpload(true);
        },
        (error) => {
          setUploadError(true);
          console.error("Upload Error: ", error);
          reject(error);  // Reject the promise if there's an error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("downloadURL", downloadURL);
              resolve(downloadURL);  // Resolve with the download URL
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              reject(error);
            });
        }
      );
    });
  } catch (error) {
    console.log("ERROR", error);
    setUploadError(true);
    return null;
  }
};

    const handleFormSubmit = async (values, { resetForm }) => {
     // Encrypt data before sending
    const encryptedData = await encryptionService.encryptData(JSON.stringify(values)); // Assuming encryptData method is available
    await dispatch(updateUser(encryptedData))
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleChangeProfileImage = (e) => {
    setProfileImage(e.target.files[0]);
    setPreviewProfileImage(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => { 
    if (loggedIn === false ) { 
      navigate('/login');
    }
  }, [navigate, loggedIn]);
  
   // Function to clear the file input value
  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (percentUpload === 100) {
      const timeoutId = setTimeout(() => {
        setUpload(false);
        clearFileInput();
      }, 500);// Delay before switching off upload progress screen
      return () => clearTimeout(timeoutId);
    }
  }, [percentUpload, upload]);
  
  
  const uploadImage = async () => {
    try {
      const photoURL =  await saveImageToFireBaseStore();
      console.log("photoURL", photoURL)
      if (uploadError === false && photoURL !== null) {
        const encryptedData = await encryptionService.encryptData(JSON.stringify({photoUrl: photoURL})); // Assuming encryptData method is available
        await dispatch(updatePhoto(encryptedData))
          .unwrap()
          .catch((error) => {
            toast.error(error.message);
          });
      }
      setPreviewProfileImage(null);
    } catch (error) {
      console.log('error', error);
      setPreviewProfileImage(null);
    }
  }
  
  return (
    <>
      {(upload || loading) && <Loader percent={percentUpload} />}
      <section className="m-4">
        <div className="max-w-[1000px] mx-auto px-5">
          <PageMenu />
          {upload && <PercentageDisplay percent={percentUpload} />}
          <div className="flex justify-start items-start">
            {!loading && loggedIn && (
              <Card CardClass={'card'}>
                <div className="w-full bg-primary rounded p-1 flex justify-center items-center mb-1">
                  <div className="flex flex-col justify-center items-center text-white mb-1 p-1">
                    {previewProfileImage === null ? (
                      <div className="flex justify-center items-center bg-blue-100 rounded-full mb-2">
                        {user.photo ? <img src={user.photo} className="w-40 h-40 object-cover rounded-full mb-2" />
                          : <span className="text-white text-sm font-bold">{'Profile'}</span>
                        }
                      </div>
                    ) : (
                      <img src={previewProfileImage} alt="Profile" className="w-40 h-40 object-cover rounded-full mb-2" />
                    )}
                    <h2 className="text-lg font-semibold">Role: {user.role}</h2>
                    {previewProfileImage !== null && (
                      <button className="flex mt-2 bg-yellow-400 rounded px-2 text-white font-bold" onClick={uploadImage}>
                        <AiOutlineCloudUpload size={24} />Upload Image
                      </button>
                    )}
                  </div>
                </div>
                <p className="pb-10 pt-2">
                  <label>Change Profile Image</label>
                  <input type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleChangeProfileImage}
                    ref={fileInputRef}
                  />
                </p>
                <Formik
                  initialValues={initialValues}
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
                        disabled={true}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                      <FloatingLabelInput
                        label="Phone"
                        name="phone"
                        type="text"
                        value={values.phone}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                      <FloatingLabelInput
                        label="Address"
                        name="address.address"
                        type="text"
                        value={values.address?.address || ''}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}
                      />
                      <FloatingLabelInput
                        label="State"
                        name="address.state"
                        type="text"
                        value={values.address?.state || ''}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        error={Boolean(touched.state && errors.state)}
                        helperText={touched.emastatel && errors.state}
                      />
                      <FloatingLabelInput
                        label="Country"
                        name="address.country"
                        type="text"
                        value={values.address?.country || ''}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        error={Boolean(touched.country && errors.country)}
                        helperText={touched.country && errors.country}
                      />
                      <button
                        type="submit"
                        className={loading ? `bg-gray-500` : `w-full text-white bg-primary font-normal p-1 border-transparent border-solid border rounded-lg cursor-pointer flex justify-center items-center transition-all duration-300`}
                      >
                        {loading ? 'Loading ...' : 'Update'}
                      </button>
                    </Form>
                  )}
                </Formik>
              </Card>)}
          </div>
      </div>
      </section>
    </>
    
  )
}

export const UserName = () => {
  const { user } = useSelector((state) => state.user)
  const username = user.fName + ' ' + user.lName
  return (
    <span style={{color:'#ff772'}}> Hi, { username}</span>
  )
}

export default Profile