
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';
import { apiFetch } from '../../../src/api';

export default function Recent() {
  const [posts, setPosts] = useState([]);

      useEffect(() => {
      const fetchPosts = async () => {
       try {
         const res = await apiFetch('/post/getPosts');
        // const data = await res.json();
        // console.log(res)
        setPosts(res.posts);
       } catch (error) {
        console.log(error)
       }
      };
      fetchPosts();
    }, []);

     const approvedPosts = posts.filter(post => post.postStatus === 'Approved');
  
  return (
    <div>
          {/* <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-full sm:h-80 lg:order-last lg:h-full">
        <img
          alt=""
          src="/Albert.jpeg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="lg:py-24">
      <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>

        <p className="mt-4 text-gray-600">
          My name is Albert E. I. A Full Stack Application Developer and a Graphic Designer with over <span className='font-semibold underline'>5YEARS EXPERIENCE.</span> My Stack 
          includes <span className='font-bold'> | MERN-Stack | NextJs | PHP | Insomnia | RestAPI | MYSQL | Postgres | Supabase | JavaScript | CSS | HTML | Bootstrap | TailwindCSS | STRAPI | PostMan | PRISMA  </span>
        </p>

        <a
          href="/search"
          className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Check out My Projects
        </a>
      </div>
    </div>
  </div>
</section> */}

    
            
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {approvedPosts && approvedPosts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Business Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((posts) => (
                <PostCard key={posts._id} posts={posts} />
              ))}
            </div>
           
          </div>
        )}
      </div>

      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>
    </div>
  )
}
