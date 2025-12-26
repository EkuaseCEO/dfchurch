import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { MdDateRange } from "react-icons/md";
import { apiFetch } from '../../../src/api';

export default function CallToAction() {
     const [programposts, setProgramPosts] = useState([]);
    
        useEffect(() => {
        const fetchProgramPosts = async () => {
         try {
           const res = await apiFetch('/post/getProgramPosts');
          console.log(res)
          setProgramPosts(res.getprogramposts);
         } catch (error) {
          console.log(error)
         }
        };
        fetchProgramPosts();
      }, []);

     const cleanText = programposts.content?.replace(/<\/?[^>]+(>|$)/g, "") || "";

  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
               
            {programposts.title}
                        
            </h2>
            <p className='text-gray-500 my-2'>
                {cleanText}
            </p>
            {/* <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="/search" target='_blank' rel='noopener noreferrer'>
                    Click Here
                </a>
            </Button> */}
        </div>
        <div className="p-7 flex-1">
            <img src={programposts.image} />
        </div>
    </div>
  )
}