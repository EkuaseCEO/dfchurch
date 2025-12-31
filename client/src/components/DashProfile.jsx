import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { apiFetchBack } from '../../../src/backendapi';

export default function DashProfile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(currentUser?.profilePicture || '');
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filePickerRef = useRef();

  // const v1 = import.meta.env.CLOUDINARY_UPLOAD_PRESET;
  // const v2 = import.meta.env.CLOUDINARY_CLOUD_NAME
  // const v3 = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  // const v4 = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
 

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle image selection & upload to Cloudinary
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImageFileUrl(URL.createObjectURL(file));
    setImageFileUploading(true);
    setImageFileUploadProgress(0);
    setImageFileUploadError(null);

    try {
      const form = new FormData();
      form.append('file', file);
      form.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: form,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Upload failed');

      setImageFileUrl(data.secure_url);
      setFormData((prev) => ({ ...prev, profilePicture: data.secure_url }));
    } catch (err) {
      console.error(err);
      setImageFileUploadError(err.message);
    } finally {
      setImageFileUploading(false);
    }
  };

  // Handle profile update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (imageFileUploading) {
      setUpdateUserError('Please wait for the image to finish uploading.');
      return;
    }

    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made.');
      return;
    }

    try {
      dispatch(updateStart());

      const updatedUser = await apiFetchBack(`/user/update/${currentUser._id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
      });

      dispatch(updateSuccess(updatedUser.user));
      setUpdateUserSuccess("User's profile updated successfully.");
    } catch (err) {
      dispatch(updateFailure(err.message));
      setUpdateUserError(err.message);
    }
  };

  // Handle account deletion
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await apiFetchBack(`/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      console.log(res); // handle any response if needed
    } catch (err) {
      console.error(err);
    }
  };

  // Handle signout
  const handleSignout = async () => {
    try {
      await apiFetchBack('/user/signout', { method: 'POST' });
      dispatch(signoutSuccess());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploading && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress || 0}%`}
              strokeWidth={5}
              styles={{
                root: { width: '100%', height: '100%' },
                path: { stroke: `rgba(62, 152, 199, 1)` },
              }}
            />
          )}
          <img
            src={imageFileUrl}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploading ? 'opacity-60' : ''
            }`}
          />
        </div>
        {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />

        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading || imageFileUploading}
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>

        {currentUser.isAdmin === 'true' && (
          <Link to="/AdminPost">
            <Button type="button" gradientDuoTone="purpleToPink" className="w-full">
              Post a Program
            </Button>
          </Link>
        )}
      </form>

      {updateUserSuccess && <Alert color="success">{updateUserSuccess}</Alert>}
      {updateUserError && <Alert color="failure">{updateUserError}</Alert>}
      {error && <Alert color="failure">{error}</Alert>}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <div className="text-center p-5">
          <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mx-auto mb-4" />
          <h3 className="mb-5 text-lg text-gray-500">
            Are you sure you want to delete your account?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeleteUser}>
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


// import { Alert, Button, Modal, TextInput } from 'flowbite-react';
// import { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import {
//   updateStart,
//   updateSuccess,
//   updateFailure,
//   deleteUserStart,
//   deleteUserSuccess,
//   deleteUserFailure,
//   signoutSuccess,
// } from '../redux/user/userSlice';
// import { HiOutlineExclamationCircle } from 'react-icons/hi';
// import { Link } from 'react-router-dom';
// import { apiFetchBack } from '../../../src/backendapi';

// export default function DashProfile() {
//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const filePickerRef = useRef();

//   const [imageFile, setImageFile] = useState(null);
//   const [imageFileUrl, setImageFileUrl] = useState(
//     currentUser?.profilePicture
//   );
//   const [imageFileUploading, setImageFileUploading] = useState(false);
//   const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
//   const [imageFileUploadError, setImageFileUploadError] = useState(null);

//   const [formData, setFormData] = useState({});
//   const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
//   const [updateUserError, setUpdateUserError] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   /* =======================
//      IMAGE PICKER
//   ======================= */
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImageFile(file);
//     setImageFileUrl(URL.createObjectURL(file)); // instant preview
//   };

//   /* =======================
//      CLOUDINARY UPLOAD
//   ======================= */
//   useEffect(() => {
//     if (imageFile) uploadImage();
//   }, [imageFile]);

// const uploadImage = async () => {
//   setImageFileUploading(true);
//   setImageFileUploadError(null);
//   setImageFileUploadProgress(0);

//   try {
//     const reader = new FileReader();

//     reader.onloadend = async () => {
//       const res = await apiFetchBack('/post/profile', {
//         method: 'POST',
//         body: JSON.stringify({
//           image: reader.result,
//         }),
//       });

//       // ✅ upload finished
//       setImageFileUrl(res.url);
//       setFormData((prev) => ({
//         ...prev,
//         profilePicture: res.url,
//       }));

//       setImageFileUploadProgress(100);
//       setImageFileUploading(false);
//     };

//     reader.readAsDataURL(imageFile);
//   } catch (error) {
//     setImageFileUploadError('Upload failed');
//     setImageFileUploading(false);
//     setImageFileUploadProgress(null);
//   }
// };


//   /* =======================
//      FORM INPUT
//   ======================= */
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.id]: e.target.value,
//     }));
//   };

//   /* =======================
//      UPDATE PROFILE
//   ======================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setUpdateUserError(null);
//     setUpdateUserSuccess(null);

//     if (Object.keys(formData).length === 0) {
//       setUpdateUserError('No changes made');
//       return;
//     }

//     if (imageFileUploading) {
//       setUpdateUserError('Please wait for image upload');
//       return;
//     }

//     try {
//       dispatch(updateStart());

//       const data = await apiFetchBack(
//         `/user/update/${currentUser._id}`,
//         {
//           method: 'PUT',
//           body: JSON.stringify(formData),
//         }
//       );

//       dispatch(updateSuccess(data.user));
//       setUpdateUserSuccess('Profile updated successfully');
//     } catch (err) {
//       dispatch(updateFailure(err.message));
//       setUpdateUserError(err.message);
//     }
//   };

//   /* =======================
//      DELETE ACCOUNT
//   ======================= */
//   const handleDeleteUser = async () => {
//     setShowModal(false);
//     try {
//       dispatch(deleteUserStart());
//       await apiFetchBack(`/user/delete/${currentUser._id}`, {
//         method: 'DELETE',
//       });
//       dispatch(deleteUserSuccess());
//     } catch (err) {
//       dispatch(deleteUserFailure(err.message));
//     }
//   };

//   /* =======================
//      SIGN OUT
//   ======================= */
//   const handleSignout = async () => {
//     try {
//       await apiFetchBack('/user/signout', { method: 'POST' });
//       dispatch(signoutSuccess());
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   /* =======================
//      UI
//   ======================= */
//   return (
//     <div className="max-w-lg mx-auto p-3 w-full">
//       <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="file"
//           accept="image/*"
//           hidden
//           ref={filePickerRef}
//           onChange={handleImageChange}
//         />

//         <div
//           className="relative w-32 h-32 self-center cursor-pointer rounded-full overflow-hidden shadow-md"
//           onClick={() => filePickerRef.current.click()}
//         >
//           {imageFileUploadProgress && imageFileUploadProgress < 100 && (
//             <CircularProgressbar
//               value={imageFileUploadProgress}
//               text={`${imageFileUploadProgress}%`}
//               strokeWidth={5}
//               styles={{
//                 root: { position: 'absolute', inset: 0 },
//               }}
//             />
//           )}

//           <img
//             src={imageFileUrl || '/default-avatar.png'}
//             alt="profile"
//             className="w-full h-full rounded-full object-cover border-8 border-gray-300"
//           />
//         </div>

//         {imageFileUploadError && (
//           <Alert color="failure">{imageFileUploadError}</Alert>
//         )}

//         <TextInput
//           id="username"
//           defaultValue={currentUser.username}
//           placeholder="Username"
//           onChange={handleChange}
//         />

//         <TextInput
//           id="email"
//           type="email"
//           defaultValue={currentUser.email}
//           placeholder="Email"
//           onChange={handleChange}
//         />

//         <TextInput
//           id="password"
//           type="password"
//           placeholder="New password"
//           onChange={handleChange}
//         />

//         <Button
//           type="submit"
//           gradientDuoTone="purpleToBlue"
//           outline
//           disabled={loading || imageFileUploading}
//         >
//           {loading ? 'Updating...' : 'Update Profile'}
//         </Button>

        

//         {currentUser.isAdmin === 'true' && (
//           <Link to="/Admin-post">
//             <Button gradientDuoTone="purpleToPink" className="w-full">
//               Post a Program
//             </Button>
//           </Link>
//         )}
//       </form>

//       {updateUserSuccess && (
//         <Alert color="success" className="mt-5">
//           {updateUserSuccess}
//         </Alert>
//       )}

//       {updateUserError && (
//         <Alert color="failure" className="mt-5">
//           {updateUserError}
//         </Alert>
//       )}

//       {error && (
//         <Alert color="failure" className="mt-5">
//           {error}
//         </Alert>
//       )}

//       <Modal show={showModal} onClose={() => setShowModal(false)} popup>
//         <Modal.Body>
//           <div className="text-center">
//             <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
//             <h3 className="mb-5 text-lg">
//               Are you sure you want to delete your account?
//             </h3>
//             <div className="flex justify-center gap-4">
//               <Button color="failure" onClick={handleDeleteUser}>
//                 Yes, delete
//               </Button>
//               <Button color="gray" onClick={() => setShowModal(false)}>
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }


// // import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
// // import { useEffect, useRef, useState } from 'react';
// // import { useSelector } from 'react-redux';
// // import {
// //   getDownloadURL,
// //   getStorage,
// //   ref,
// //   uploadBytesResumable,
// // } from 'firebase/storage';
// // import { app } from '../../firebase';
// // import { CircularProgressbar } from 'react-circular-progressbar';
// // import 'react-circular-progressbar/dist/styles.css';
// // import {
// //   updateStart,
// //   updateSuccess,
// //   updateFailure,
// //   deleteUserStart,
// //   deleteUserSuccess,
// //   deleteUserFailure,
// //   signoutSuccess,
// // } from '../redux/user/userSlice';
// // import { useDispatch } from 'react-redux';
// // import { HiOutlineExclamationCircle } from 'react-icons/hi';
// // import { Link } from 'react-router-dom';
// // import { apiFetch } from '../../../src/api';
// // import { apiFetchBack } from '../../../src/backendapi';
// // import { Cloudinary } from '@cloudinary/url-gen';
// // import { auto } from '@cloudinary/url-gen/actions/resize';
// // import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';


// // export default function DashProfile() {
// //   const { currentUser, error, loading } = useSelector((state) => state.user);
// //   const [imageFile, setImageFile] = useState(null);
// //   const [imageFileUrl, setImageFileUrl] = useState(null);
// //   const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
// //   const [imageFileUploadError, setImageFileUploadError] = useState(null);
// //   const [imageFileUploading, setImageFileUploading] = useState(false);
// //   const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
// //   const [updateUserError, setUpdateUserError] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const [formData, setFormData] = useState({});
// //   const filePickerRef = useRef();
// //   const dispatch = useDispatch();
  
// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // const cld = new Cloudinary({ cloud: { cloudName: 'du5luzuig' } });

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setImageFile(file);
// //       setImageFileUrl(URL.createObjectURL(file));
// //     }
// //   };

// //   useEffect(() => {
// //     if (imageFile) {
// //       uploadImage();
// //     }
// //   }, [imageFile]);

// //   const uploadImage = async () => {
// //        setImageFileUploading(true);
// //     setImageFileUploadError(null);
// //     const storage = getStorage(app)
// //     const fileName = new Date().getTime() + imageFile.name;
// //     const storageRef = ref(storage, fileName);
// //     const uploadTask = uploadBytesResumable(storageRef, imageFile);
// //     uploadTask.on(
// //       'state_changed',
// //       (snapshot) => {
// //         const progress =
// //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

// //         setImageFileUploadProgress(progress.toFixed(0));
// //       },
// //       (error) => {
// //         setImageFileUploadError(
// //           'Could not upload image (File must be less than 2MB)'
// //         );
// //         setImageFileUploadProgress(null);
// //         setImageFile(null);
// //         setImageFileUrl(null);
// //         setImageFileUploading(false);
// //       },
// //       () => {
// //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
// //           setImageFileUrl(downloadURL);
// //           setFormData({ ...formData, profilePicture: downloadURL });
// //           setImageFileUploading(false);
// //         });
// //       }
// //     );
// //   };

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.id]: e.target.value });
// //   };



  

// //   const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   setUpdateUserError(null);
// //   setUpdateUserSuccess(null);

// //   if (Object.keys(formData).length === 0) {
// //     setUpdateUserError('No changes made');
// //     return;
// //   }

// //   if (imageFileUploading) {
// //     setUpdateUserError('Please wait for image to upload');
// //     return;
// //   }

// //   try {
// //     dispatch(updateStart());

// //     const data = await apiFetchBack(`/user/update/${currentUser._id}`, {
// //       method: 'PUT',
// //       body: JSON.stringify(formData),
// //     });

// //     // ✅ success (apiFetch throws on failure)
// //     dispatch(updateSuccess(data.user));
// //     setUpdateUserSuccess("User's profile updated successfully");

// //   } catch (error) {
// //     dispatch(updateFailure(error.message));
// //     setUpdateUserError(error.message);
// //   }
// // };


// //   // const handleSubmit = async (e) => {
// //   //   e.preventDefault();
// //   //   setUpdateUserError(null);
// //   //   setUpdateUserSuccess(null);
// //   //   if (Object.keys(formData).length === 0) {
// //   //     setUpdateUserError('No changes made');
// //   //     return;
// //   //   }
// //   //   if (imageFileUploading) {
// //   //     setUpdateUserError('Please wait for image to upload');
// //   //     return;
// //   //   }
// //   //   try {
// //   //     dispatch(updateStart());
// //   //     const res = await fetch(`/api/user/update/${currentUser._id}`, {
// //   //       method: 'PUT',
// //   //       headers: {
// //   //         'Content-Type': 'application/json',
// //   //       },
// //   //       body: JSON.stringify(formData),
// //   //     });
// //   //     const data = await res.json();
// //   //     if (!res.ok) {
// //   //       dispatch(updateFailure(data.message));
// //   //       setUpdateUserError(data.message);
// //   //     } else {
// //   //       dispatch(updateSuccess(data));
// //   //       setUpdateUserSuccess("User's profile updated successfully");
// //   //     }
// //   //   } catch (error) {
// //   //     dispatch(updateFailure(error.message));
// //   //     setUpdateUserError(error.message);
// //   //   }
// //   // };
// //   const handleDeleteUser = async () => {
// //     setShowModal(false);
// //     try {
// //       dispatch(deleteUserStart());
// //       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
// //         method: 'DELETE',
// //       });
// //       const data = await res.json();
// //       if (!res.ok) {
// //         dispatch(deleteUserFailure(data.message));
// //       } else {
// //         dispatch(deleteUserSuccess(data));
        
// //       }
// //     } catch (error) {
// //       dispatch(deleteUserFailure(error.message));
// //     }
// //   };

// //   const handleSignout = async () => {
// //     try {
// //       const res = await fetch('/api/user/signout', {
// //         method: 'POST',
// //       });
// //       const data = await res.json();
// //       if (!res.ok) {
// //         console.log(data.message);
// //       } else {
// //         dispatch(signoutSuccess());
// //       }
// //     } catch (error) {
// //       console.log(error.message);
// //     }
// //   };
// //   return (
// //     <div className='max-w-lg mx-auto p-3 w-full'>
// //       <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
// //       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
// //         <input
// //           type='file'
// //           accept='image/*'
// //           onChange={handleImageChange}
// //           ref={filePickerRef}
// //           hidden
// //         />
// //         <div
// //           className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
// //           onClick={() => filePickerRef.current.click()}
// //         >
// //           {imageFileUploadProgress && (
// //             <CircularProgressbar
// //               value={imageFileUploadProgress || 0}
// //               text={`${imageFileUploadProgress}%`}
// //               strokeWidth={5}
// //               styles={{
// //                 root: {
// //                   width: '100%',
// //                   height: '100%',
// //                   position: 'absolute',
// //                   top: 0,
// //                   left: 0,
// //                 },
// //                 path: {
// //                   stroke: `rgba(62, 152, 199, ${
// //                     imageFileUploadProgress / 100
// //                   })`,
// //                 },
// //               }}
// //             />
// //           )}
// //           <img
// //             src={imageFileUrl || currentUser.profilePicture}
// //             alt='user'
// //             className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
// //               imageFileUploadProgress &&
// //               imageFileUploadProgress < 100 &&
// //               'opacity-60'
// //             }`}
// //           />
// //         </div>
// //         {imageFileUploadError && (
// //           <Alert color='failure'>{imageFileUploadError}</Alert>
// //         )}
// //         <TextInput
// //           type='text'
// //           id='username'
// //           placeholder='username'
// //           defaultValue={currentUser.username}
// //           onChange={handleChange}
// //         />
// //         <TextInput
// //           type='email'
// //           id='email'
// //           placeholder='email'
// //           defaultValue={currentUser.email}
// //           onChange={handleChange}
// //         />
// //         <TextInput
// //           type='password'
// //           id='password'
// //           placeholder='password'
// //           onChange={handleChange}
// //         />
// //         <Button
// //           type='submit'
// //           gradientDuoTone='purpleToBlue'
// //           outline
// //           disabled={loading || imageFileUploading}
// //         >
// //           {loading ? 'Loading...' : 'Update'}
// //         </Button>
// //         {currentUser.isAdmin == "true" && (
// //           <Link to={'/Admin-post'}>
// //             <Button
// //               type='button'
// //               gradientDuoTone='purpleToPink'
// //               className='w-full'
// //             >
// //               Post a Program
// //             </Button>
// //           </Link>
// //         )}
// //       </form>
// //       {/* <div className='text-red-500 flex justify-between mt-5'>
// //         <span onClick={() => setShowModal(true)} className='cursor-pointer'>
// //           Delete Account
// //         </span>
// //         <span onClick={handleSignout} className='cursor-pointer'>
// //           Sign Out
// //         </span>
// //       </div> */}
// //       {updateUserSuccess && (
// //         <Alert color='success' className='mt-5'>
// //           {updateUserSuccess}
// //         </Alert>
// //       )}
// //       {updateUserError && (
// //         <Alert color='failure' className='mt-5'>
// //           {updateUserError}
// //         </Alert>
// //       )}
// //       {error && (
// //         <Alert color='failure' className='mt-5'>
// //           {error}
// //         </Alert>
// //       )}
// //       <Modal
// //         show={showModal}
// //         onClose={() => setShowModal(false)}
// //         popup
// //         size='md'
// //       >
// //         <Modal.Header />
// //         <Modal.Body>
// //           <div className='text-center'>
// //             <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
// //             <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
// //               Are you sure you want to delete your account?
// //             </h3>
// //             <div className='flex justify-center gap-4'>
// //               <Button color='failure' onClick={handleDeleteUser}>
// //                 Yes, I'm sure
// //               </Button>
// //               <Button color='gray' onClick={() => setShowModal(false)}>
// //                 No, cancel
// //               </Button>
// //             </div>
// //           </div>
// //         </Modal.Body>
// //       </Modal>
// //     </div>
// //   );
// // }