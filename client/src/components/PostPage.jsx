import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetchBack } from '../../../src/backendapi';
import { Button, Spinner } from 'flowbite-react';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
   const [recentPosts, setRecentPosts] = useState(null);
   const [error, setError] = useState(false);

    useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await apiFetchBack(`/post/getposts?slug=${postSlug}`);
        console.log(res || 'Nothing Fetched')
        // const data = await res.json();
        if (!res) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res) {
          setPost(res.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);


    useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await apiFetchBack(`/post/getposts?limit=3`);
        // const data = await res.json();
        if (res) {
          setRecentPosts(res.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const post_id = post && post._id

  return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`/`}
        // to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
     
      <CommentSection postId={post_id} />

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent Updates</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts
              .filter(posts => posts.postStatus === 'Approved') // ✅ only approved posts
              .map(posts => <PostCard key={posts._id} posts={posts} />)
          }
        </div>
      </div>
    </main>
  )
}


// import { Button, Spinner } from 'flowbite-react';
// import { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import CallToAction from './CallToAction';
// import PostCard from './PostCard';
// import CommentSection from './CommentSection';
// import { apiFetchBack } from '../../../src/backendapi';
// // import CallToAction from '../components/CallToAction';
// // import CommentSection from '../components/CommentSection';
// // import PostCard from '../components/PostCard';

// export default function PostPage() {
//   const { postSlug } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [post, setPost] = useState(null);
//   const [recentPosts, setRecentPosts] = useState(null);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await apiFetchBack(`/post/getposts?slug=${postSlug}`);
  //       // console.log(res || 'Nothing Fetched')
  //       // const data = await res.json();
  //       if (!res) {
  //         setError(true);
  //         setLoading(false);
  //         return;
  //       }
  //       if (res) {
  //         setPost(res.posts[0]);
  //         setLoading(false);
  //         setError(false);
  //       }
  //     } catch (error) {
  //       setError(true);
  //       setLoading(false);
  //     }
  //   };
  //   fetchPost();
  // }, [postSlug]);

  // useEffect(() => {
  //   try {
  //     const fetchRecentPosts = async () => {
  //       const res = await apiFetchBack(`/post/getposts?limit=3`);
  //       // const data = await res.json();
  //       if (res) {
  //         setRecentPosts(res.posts);
  //       }
  //     };
  //     fetchRecentPosts();
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, []);

//   //  const approvedPosts = recentPosts.filter(post => post.postStatus === 'Approved');
//   //  const approvedPosts = posts.filter(post => post.postStatus === 'Approved');
  

//   if (loading)
//     return (
//       <div className='flex justify-center items-center min-h-screen'>
//         <Spinner size='xl' />
//       </div>
//     );
//   return (
    // <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
    //   <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
    //     {post && post.title}
    //   </h1>
    //   <Link
    //     to={`/search?category=${post && post.category}`}
    //     className='self-center mt-5'
    //   >
    //     <Button color='gray' pill size='xs'>
    //       {post && post.category}
    //     </Button>
    //   </Link>
    //   <img
    //     src={post && post.image}
    //     alt={post && post.title}
    //     className='mt-10 p-3 max-h-[600px] w-full object-cover'
    //   />
    //   <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
    //     <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
    //     <span className='italic'>
    //       {post && (post.content.length / 1000).toFixed(0)} mins read
    //     </span>
    //   </div>
    //   <div
    //     className='p-3 max-w-2xl mx-auto w-full post-content'
    //     dangerouslySetInnerHTML={{ __html: post && post.content }}
    //   ></div>
    //   <div className='max-w-4xl mx-auto w-full'>
    //     <CallToAction />
    //   </div>
    //   <CommentSection postId={post._id} />

    //   <div className='flex flex-col justify-center items-center mb-5'>
    //     <h1 className='text-xl mt-5'>Recent Updates</h1>
    //     <div className='flex flex-wrap gap-5 mt-5 justify-center'>
    //       {recentPosts &&
    //         recentPosts
    //           .filter(post => post.postStatus === 'Approved') // ✅ only approved posts
    //           .map(post => <PostCard key={post._id} post={post} />)
    //       }
    //     </div>
    //   </div>
    // </main>
//   );
// }

