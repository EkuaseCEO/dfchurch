import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CallToAction from '../components/CallToAction';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { apiFetch } from '../../../src/api';



export default function CreatePost() {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  // const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canPost, setCanPost] = useState(true); // default allow posting
  const [nextAllowedDate, setNextAllowedDate] = useState(null);
  const [formData, setFormData] = useState({
  title: '',
  content: '',
  image: '',
  imagePublicId: '', // include it here from the start
});

  const navigate = useNavigate();


// const cld = new Cloudinary({
//   cloud: { cloudName: 'du5luzuig' }
// });

//   const img = cld.image(publicId)
//     .resize(auto().width(800))
//     .quality('auto')
//     .format('auto');

  const cld = new Cloudinary({ cloud: { cloudName: 'du5luzuig' } });
  
  // Use this sample image or upload your own via the Media Library
  const img = cld
        .image('cld-sample-3')
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  











 useEffect(() => {
    // Check if user can post this month
    const checkMonthlyPost = async () => {
      try {
          const res = await apiFetch(`/post/getUserPostPerMonth/${currentUser._id}`);
          // const data = await res.json();
        // console.log(data)

       if (!res) {
        setCanPost(false);
        setPublishError(res.message || "Cannot check post limit");
      } else {
        setCanPost(res.canPost);
        setNextAllowedDate(res.nextAllowedDate);
      }
    } catch (err) {
      console.error(err);
      setCanPost(false);
      setPublishError("Failed to check post limit");
    }
    };

    checkMonthlyPost();
  }, []);


const handleUpdloadImage = async () => {
  try {
    if (!file) {
      setImageUploadError('Please select an image');
      return;
    }

    setImageUploadError(null);
    setImageUploadProgress(0);

    const formDataCloud = new FormData();
    formDataCloud.append('file', file);
    formDataCloud.append('upload_preset', 'Userposting');

    const xhr = new XMLHttpRequest();

    xhr.open(
      'POST',
      'https://api.cloudinary.com/v1_1/du5luzuig/image/upload'
    );

    // ✅ Track upload progress (like Firebase)
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setImageUploadProgress(progress.toFixed(0));
      }
    };

    xhr.onload = () => {
      if (xhr.status !== 200) {
        setImageUploadError('Image upload failed');
        setImageUploadProgress(null);
        return;
      }

      const response = JSON.parse(xhr.responseText);
      const data = JSON.parse(xhr.responseText);

      setImageUploadProgress(null);
      setImageUploadError(null);

      // setFormData({
      //   ...formData,
      //   image: response.secure_url, // ✅ Cloudinary image URL
      //   imagePublicId: data.public_id,
      // });
       setFormData(prev => ({
        ...prev,
        image: data.secure_url,
        imagePublicId: data.public_id,
      }));
    };

    xhr.onerror = () => {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
    };

    xhr.send(formDataCloud);
  } catch (error) {
    console.error(error);
    setImageUploadError('Image upload failed');
    setImageUploadProgress(null);
  }
};




  // const handleUpdloadImage = async () => {
  //   try {
  //     if (!file) {
  //       setImageUploadError('Please select an image');
  //       return;
  //     }
  //     setImageUploadError(null);
  //      const formData = new FormData();
  // formData.append('file', file);
  // formData.append('upload_preset', 'Userposting');

  // const res = await fetch(
  //   'https://api.cloudinary.com/v1_1/du5luzuig/image/upload',
  //   {
  //     method: 'POST',
  //     body: formData,
  //   }
  // );

  // const data = await res.json();
  // console.log(data)
  // return data; // contains secure_url & public_i
      
  //   } catch (error) {
  //     setImageUploadError('Image upload failed');
  //     setImageUploadProgress(null);
  //     console.log(error);
  //   }
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // const data = await res.json();
      if (!res) {
        setPublishError(res.message);
        return;
      }

      if (res) {
        setPublishError(null);
        // navigate(`/post/${data.slug}`);
        navigate(`/postSuccess`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };


  const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  return (
    <div>
      {/* <AdvancedImage cldImg={img}/> */}
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
     {canPost ? (
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {/* <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
            <option value='PHPandMySQL'>PHP and MySQL</option>
            <option value='React-Native'>React Native</option>
          </Select> */}
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
         Publish
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}

      </form>
     ) : (
       <div className="p-4 bg-red-100 text-red-700 rounded">
    <p className="font-bold">
      You have already posted this month.
    </p>
        {nextAllowedDate && (
      <Alert className="mt-1" color='failure'>
        You can post again anytime as from <strong>{formatDate(nextAllowedDate)}</strong>.
      </Alert>
    )}
  </div>
     )}

    </div>
    <div className='mt-20'>
<CallToAction />

    </div>
    </div>
  );
}



// import React from 'react'
// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';

// const App = () => {
  // const cld = new Cloudinary({ cloud: { cloudName: 'du5luzuig' } });
  
  // // Use this sample image or upload your own via the Media Library
  // const img = cld
  //       .image('cld-sample-5')
  //       .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
  //       .quality('auto')
  //       .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  // return (<AdvancedImage cldImg={img}/>);
// };

// export default App
// npm i @cloudinary/url-gen @cloudinary/react
//  CLOUDINARY_URL=cloudinary://273715727423773:yg92TDVP0f9JljsxFnHSla-nh48@du5luzuig
// cloud name: du5luzuig
// API Secret: yg92TDVP0f9JljsxFnHSla-nh48
// API Key: 273715727423773