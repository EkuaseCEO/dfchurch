import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { MdDateRange } from "react-icons/md";

export default function CallToAction() {
     const [posts, setPosts] = useState([]);
    
        useEffect(() => {
        const fetchPosts = async () => {
          const res = await fetch('/api/post/getProgramPosts');
          const data = await res.json();
          // console.log(data.getprogramposts)
          setPosts(data.getprogramposts);
        };
        fetchPosts();
      }, []);

     const cleanText = posts.content?.replace(/<\/?[^>]+(>|$)/g, "") || "";

  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
               
            {posts.title}
                        
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
            <img src={posts.image} />
        </div>
    </div>
  )
}