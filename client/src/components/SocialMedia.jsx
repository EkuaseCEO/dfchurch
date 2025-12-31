import {
  Alert,
  Button,
  TextInput,
  Label
} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { apiFetchBack } from '../../../src/backendapi';

export default function SocialMedia() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  // Function to convert YouTube URLs to embed URLs
  const convertToEmbed = (url) => {
    if (!url) return "";

    let videoId = "";

    // https://youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) videoId = watchMatch[1];

    // https://youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) videoId = shortMatch[1];

    // https://youtube.com/live/VIDEO_ID
    const liveMatch = url.match(/youtube\.com\/live\/([a-zA-Z0-9_-]+)/);
    if (liveMatch) videoId = liveMatch[1];

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  // Fetch existing settings
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiFetchBack(`/post/getSettings`);
        const settings = res.Settings?.[0];

        if (!res) {
          setPublishError("Failed to fetch settings");
          return;
        }

        setFormData({
          facebook: settings?.facebook || '',
          postIds: settings?._id || '',
          instagram: settings?.instagram || '',
          youtube: settings?.youtube || '',
          youtubelink: settings?.youtubelink || '',
          emailink: settings?.emailink || '',
          phonenumber: settings?.phonenumber || '',
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPost();
  }, [postId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiFetchBack(`/post/updateSetting/${formData.postIds}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res) {
        setPublishError(res.message || "Failed to update settings");
        return;
      }

      setPublishError("Updated Successfully!");
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className='p-3 max-w-5xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Social Media Links</h1>

      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>

        {/* Facebook */}
        <div>
          <Label htmlFor="facebook">Company Facebook Link</Label>
          <TextInput
            id="facebook"
            type="text"
            placeholder="https://facebook.com/..."
            value={formData.facebook || ""}
            onChange={(e) =>
              setFormData({ ...formData, facebook: e.target.value })
            }
          />
        </div>

        {/* Instagram */}
        <div>
          <Label htmlFor="instagram">Company Instagram Link</Label>
          <TextInput
            id="instagram"
            type="text"
            placeholder="https://instagram.com/..."
            value={formData.instagram || ""}
            onChange={(e) =>
              setFormData({ ...formData, instagram: e.target.value })
            }
          />
        </div>

        {/* YouTube Link */}
        <div>
          <div className="mb-2 flex items-center">
            <TbBrandYoutubeFilled className='text-2xl mr-2' />
            <Label htmlFor="youtubelink">YouTube Live Link</Label>
          </div>
            <TextInput
    id="youtubelink"
    type="text"
    placeholder="Paste YouTube Live Link"
    value={formData.youtubelink || ""}
    onChange={(e) => {
      const liveLink = e.target.value;
      setFormData((prev) => ({
        ...prev,
        youtubelink: convertToEmbed(liveLink),
        youtube: convertToEmbed(liveLink), // convert immediately as user types or pastes
      }));
    }}
  />
          {/* <TextInput
            id="youtubelink"
            type="text"
            placeholder="Paste YouTube Live Link"
            value={formData.youtubelink || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                youtubelink: e.target.value,
                youtube: convertToEmbed(e.target.value), // auto convert
              }))
            }
          /> */}
          {/* Live preview */}
          {formData.youtube && (
            <div className="w-full aspect-video mt-4">
              <iframe
                src={formData.youtube}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Live Preview"
              />
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="emailink">Email Address Link</Label>
          <TextInput
            id="emailink"
            type="text"
            placeholder="example@example.com"
            value={formData.emailink || ""}
            onChange={(e) =>
              setFormData({ ...formData, emailink: e.target.value })
            }
          />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phonenumber">Phone Number</Label>
          <TextInput
            id="phonenumber"
            type="text"
            placeholder="000-0000-0000"
            value={formData.phonenumber || ""}
            onChange={(e) =>
              setFormData({ ...formData, phonenumber: e.target.value })
            }
          />
        </div>

        <Button type="submit">Submit</Button>

        {publishError && (
          <Alert className='mt-5' color={publishError === "Updated Successfully!" ? 'success' : 'failure'}>
            {publishError}
          </Alert>
        )}

      </form>
    </div>
  );
}



// import { Alert, Button, FileInput, Select, TextInput, Checkbox, Label } from 'flowbite-react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../../firebase';
// import { useEffect, useState } from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { TbBrandYoutubeFilled } from "react-icons/tb";
// import { apiFetchBack } from '../../../src/backendapi';

// export default function SocialMedia() {
//   const [file, setFile] = useState(null);
//   const [imageUploadProgress, setImageUploadProgress] = useState(null);
//   const [imageUploadError, setImageUploadError] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [publishError, setPublishError] = useState(null);
//   const { postId } = useParams();

//   const navigate = useNavigate();
//     const { currentUser } = useSelector((state) => state.user);


    

//   useEffect(() => {
//     try {
//       const fetchPost = async () => {
//         const res = await apiFetchBack(`/post/getSettings`);
//         // const data = await res.json();
//          const settings = res.Settings[0]
//         console.log(settings._id)

  
//         if (!res) {
//           console.log(res);
//           setPublishError(res);
//           return;
//         }
//         if (res) {
//           setPublishError(null);
//                 setFormData({
//       facebook: settings.facebook || '',
//       postIds: settings._id || '',
//       instagram: settings.instagram || '',
//       youtube: settings.youtube || '',
//       youtubelink: settings.youtubelink || '',
//       emailink: settings.emailink || '',
//       phonenumber: settings.phonenumber || '',
//     });
//         }
//       };

//       fetchPost();
//     } catch (error) {
//       console.log(error.message);
//     }
//   }, [postId]);


 

  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData.postIds)
//     try {
//       const res = await apiFetchBack(`/post/updateSetting/${formData.postIds}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       // const data = await res.json();
//       if (!res) {
//         setPublishError(res.message);
//         return;
//       }

//       if (res) {
//         setPublishError(null);
//         setPublishError('Updated Successfully!');
//         // navigate(`/post/${data.slug}`);
//       }
//     } catch (error) {
//       // console.log(error)
//       setPublishError('Something went wrong');
//     }
//   };





//   return (
//     <div className='p-3 max-w-5xl mx-auto min-h-screen'>
//       <h1 className='text-center text-3xl my-7 font-semibold'>Update Social Meia Links  </h1>
//       <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="email1">Company Facebook Link</Label>
//         </div>
//         <TextInput id="text" type="text" placeholder="name@example.com" 
//         value={formData.facebook} required 
//            onChange={(e) =>
//             setFormData({
//               ...formData,
//               facebook: e.target.value,
//             })
//           }
//         />
//       </div>
//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="email1">Company Instagram Link</Label>
//         </div>
//         <TextInput id="text" type="text" placeholder="name@example.com" value={formData.instagram}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               instagram: e.target.value,
//             })
//           } />
//       </div>
//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="email1">Company Youtube Link</Label>
//         </div>
//         <TextInput id="text" type="text" placeholder="name@example.com" value={formData.youtube}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               youtube: e.target.value,
//             })
//           }
//         />
//       </div>

//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="email1">Email Address Link</Label>
//         </div>
//         <TextInput id="text" type="text" placeholder="name@example.com" value={formData.emailink}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               emailink: e.target.value,
//             })
//           }
//         />
//       </div>
//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="email1">Phone Number</Label>
//         </div>
//         <TextInput id="text" type="text" placeholder="000-0000-0000" value={formData.phonenumber}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               phonenumber: e.target.value,
//             })
//           }
//         />
//       </div>

//       <div>
//         <div className="mb-2 flex flex-row justify-center">
//           <TbBrandYoutubeFilled className='text-2xl mr-5' /> 
//           <Label htmlFor="email1">   Youtube Live Link</Label>
//         </div>
//         <TextInput id="text" type="text" placeholder="name@example.com" value={formData.youtubelink}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               youtubelink: e.target.value,
//             })
//           }
//         />
//       </div>
    
//       <Button type="submit">Submit</Button>
//         {publishError && (
//                 <Alert className='mt-5' color='failure'>
//                   {publishError}
//                 </Alert>
//               )}
//     </form>
//     </div>
//   );
// }