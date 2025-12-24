import { Alert, Button, FileInput, Select, TextInput, Checkbox, Label, Textarea  } from 'flowbite-react';
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

export default function ChurchInformation() {
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
      Aboutus: settings.Aboutus || '',
      corevalue: settings.corevalue || '',
      ourbelief: settings.ourbelief || '',
      ourvision: settings.ourvision || '',
      ourmission: settings.ourmission || '',
      churchaddress: settings.churchaddress || '',
    });
    console.log(settings.Aboutus)
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
      const res = await fetch(`/api/post/updateSetting/693f2cabf5c3b5ffa8e93bfc`, {
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
      <h1 className='text-center text-3xl my-7 font-semibold'>Church Information  </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        </div>
        <h3 className='text-1xl font-semibold'>ABOUT US</h3>
        <ReactQuill
          theme='snow'
          placeholder='This is About the Church Information'
          className='h-52  mb-12'
          required
          value={formData.Aboutus}
        onChange={(value) => {
            setFormData({
              ...formData,
              Aboutus: value,
            });
          }}
          />


           <div className="max-w-md">
      <div className="mb-2 block">
            <Label htmlFor="comment">OUR VISION</Label>
          </div>
          <Textarea id="comment" placeholder="Leave a comment..." 
          required rows={6} 
          value={formData.ourvision}
        onChange={(e) =>
          setFormData({ ...formData, ourvision: e.target.value })
        }
          />
        </div>



     <h3 className='text-1xl font-semibold'>OUR BELIEFS</h3>
      <div className="max-w-md">
      <div className="mb-2 block">
      </div>
      <Textarea id="comment" placeholder="Leave a comment..." 
      required rows={6} 
      value={formData.ourbelief}
    onChange={(e) =>
      setFormData({ ...formData, ourbelief: e.target.value })
    }
      />
    </div>

     <h3 className='text-1xl font-semibold'>OUR CORE VALUES</h3>
        <div className="max-w-md">
      <div className="mb-2 block">
      </div>
      <Textarea id="comment" placeholder="Leave a comment..." 
      required rows={6} 
      value={formData.corevalue}
    onChange={(e) =>
      setFormData({ ...formData, corevalue: e.target.value })
    }
      />
    </div>
        
     <h3 className='text-1xl font-semibold'>OUR MISSION</h3>
       <div className="max-w-md">
      <div className="mb-2 block">
      </div>
      <Textarea id="comment" placeholder="Leave a comment..." 
      required rows={6} 
      value={formData.ourmission}
    onChange={(e) =>
      setFormData({ ...formData, ourmission: e.target.value })
    }
      />
    </div>


     <h3 className='text-1xl font-semibold'>CHURCH ADDRESS</h3>
      <div className="max-w-md">
      <div className="mb-2 block">
      </div>
      <Textarea id="comment" placeholder="Leave a comment..." 
      required rows={6} 
      value={formData.churchaddress}
    onChange={(e) =>
      setFormData({ ...formData, churchaddress: e.target.value })
    }
      />
    </div>


          
        <Button type='submit' gradientDuoTone='purpleToPink' className='mb-4'>
          Update post
        </Button>
        {publishError && (
          <Alert className='mt-1' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}