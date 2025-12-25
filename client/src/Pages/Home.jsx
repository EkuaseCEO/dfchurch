
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';
import YoutubeLive from '../components/YoutubeLive';
import DaysofService from '../components/daysofService';
import Slider from '../components/Slider';
import PhotoSlide from '../components/Slider';
import Welcome from '../components/welcome';
import { apiFetch } from '../../../src/api';

export default function Home() {
  const [posts, setPosts] = useState([]);

    useEffect(() => {
    const fetchPosts = async () => {
      const res = await apiFetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const approvedPosts = posts.filter(post => post.postStatus === 'Approved');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  console.log(API_BASE_URL || "Nothing")

  return (
    <div>
            <PhotoSlide />
         <Welcome />

      
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Updates</h2>
            <div className='flex flex-wrap gap-4'>
              {approvedPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
           
          </div>
        )}
      </div>

        {/* <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7 text-center text-5xl font-bold'>
          WELCOME TO DOMINION FAITH CHAPEL
        </div> */}

      <DaysofService />

      <YoutubeLive />


      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>
    </div>
  )
}
