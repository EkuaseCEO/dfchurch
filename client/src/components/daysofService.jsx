import React, { useEffect, useState } from 'react'
import { FaCalendarAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { CiViewTimeline } from "react-icons/ci";
import { IoLocation } from "react-icons/io5";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { apiFetch } from '../../../src/api';


export default function DaysofService({setting}) {

    // const [posts, setPosts] = useState([]);
        
    //         useEffect(() => {
    //         const fetchPosts = async () => {
    //          try {
    //            const res = await apiFetch('/post/getSettings');
    //           const data = await res.json();
    //           console.log(data.Settings[0])
    //           setPosts(res.Settings[0]);
    //          } catch (error) {
    //           console.log(error)
    //          }
    //         };
    //         fetchPosts();
    //       }, []);
  return (
    <div>
  <div className="flex justify-center space-x-12 my-6 p-11">

  <div className="flex flex-col items-center text-center space-y-2">
     <span className="text-6xl">
    <FaCalendarAlt />
  </span>
  <p className="font-bold text-2xl">
    Sunday Service
  </p>
  <p>
    Sundays starting at 11am
  </p>
  </div>

  <div className="flex flex-col items-center text-center space-y-2">
     <span className="text-6xl">
    <MdDateRange />
  </span>
  <p className="font-bold text-2xl">
   Prayer Meeting
  </p>
  <p>
    Tuesdays Starting at 7pm
  </p>
  </div>

  <div className="flex flex-col items-center text-center space-y-2">
     <span className="text-6xl">
    <CiViewTimeline />
  </span>
  <p className="font-bold text-2xl">
    House Fellowship
  </p>
  <p>
    Thursdays Starting at 7pm
  </p>
  </div>



</div>
  <div className='flex flex-col items-center text-center space-y-2 mb-11'>
    <div className='flex flex-col items-center text-center space-y-2'>

    <span className='text-4xl'><IoLocation /></span>
    </div>
   <p className='text-2xl mb-11'> 1344, Commissioners Road, London </p>
   <span className='text-4xl space-x-5'><MdOutlinePhoneInTalk /></span>
   <p className='text-2xl mb-10'> 000-000-0000 </p>
   <div className='flex flex-row space-x-5'>
  
  <a href={setting.facebook}><span className='text-3xl'><FaFacebook /></span> </a> 
  <span className='text-3xl'><a href={setting.instagram}><FaSquareInstagram/></a></span>  
  <span className='text-3xl'><a href={setting.youtube}><FaYoutube/></a></span>  

  </div>
   </div>
  </div>

  )
}
