import { Alert, Button, FileInput, Select, TextInput, Checkbox, Label } from 'flowbite-react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TbBrandYoutubeFilled } from "react-icons/tb";

export default function SocialMedia() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();

  const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getSettings`);
        const data = await res.json();
         const settings = data.Settings[0]
        console.log(settings._id)

  
        if (!res.ok) {
          console.log(data);
          setPublishError(data);
          return;
        }
        if (res.ok) {
          setPublishError(null);
                setFormData({
      facebook: settings.facebook || '',
      postIds: settings._id || '',
      instagram: settings.instagram || '',
      youtube: settings.youtube || '',
      youtubelink: settings.youtubelink || '',
      emailink: settings.emailink || '',
      phonenumber: settings.phonenumber || '',
    });
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);


 

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.postIds)
    try {
      const res = await fetch(`/api/post/updateSetting/${formData.postIds}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setPublishError('Updated Successfully!');
        // navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      // console.log(error)
      setPublishError('Something went wrong');
    }
  };





  return (
    <div className='p-3 max-w-5xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Social Meia Links  </h1>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1">Company Facebook Link</Label>
        </div>
        <TextInput id="text" type="text" placeholder="name@example.com" 
        value={formData.facebook} required 
           onChange={(e) =>
            setFormData({
              ...formData,
              facebook: e.target.value,
            })
          }
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1">Company Instagram Link</Label>
        </div>
        <TextInput id="text" type="text" placeholder="name@example.com" value={formData.instagram}
          onChange={(e) =>
            setFormData({
              ...formData,
              instagram: e.target.value,
            })
          } />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1">Company Youtube Link</Label>
        </div>
        <TextInput id="text" type="text" placeholder="name@example.com" value={formData.youtube}
          onChange={(e) =>
            setFormData({
              ...formData,
              youtube: e.target.value,
            })
          }
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1">Email Address Link</Label>
        </div>
        <TextInput id="text" type="text" placeholder="name@example.com" value={formData.emailink}
          onChange={(e) =>
            setFormData({
              ...formData,
              emailink: e.target.value,
            })
          }
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1">Phone Number</Label>
        </div>
        <TextInput id="text" type="text" placeholder="000-0000-0000" value={formData.phonenumber}
          onChange={(e) =>
            setFormData({
              ...formData,
              phonenumber: e.target.value,
            })
          }
        />
      </div>

      <div>
        <div className="mb-2 flex flex-row justify-center">
          <TbBrandYoutubeFilled className='text-2xl mr-5' /> 
          <Label htmlFor="email1">   Youtube Live Link</Label>
        </div>
        <TextInput id="text" type="text" placeholder="name@example.com" value={formData.youtubelink}
          onChange={(e) =>
            setFormData({
              ...formData,
              youtubelink: e.target.value,
            })
          }
        />
      </div>
    
      <Button type="submit">Submit</Button>
        {publishError && (
                <Alert className='mt-5' color='failure'>
                  {publishError}
                </Alert>
              )}
    </form>
    </div>
  );
}