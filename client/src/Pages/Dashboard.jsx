import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import MyPosts from '../components/MyPosts';
import Setting from '../components/Setting';
import SocialMedia from '../components/SocialMedia';
import ChurchInformation from '../components/churchinformation';
import DashboardComp from '../components/DashboardComp';

export default function Dashboard() {
    const location = useLocation();
  const [tab, setTab] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    console.log(tabFromUrl)
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
       <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
       {tab === 'profile' && <DashProfile />}

       {/* My Post */}
      {tab === 'myposts' && <MyPosts />}
       {/* Create Post */}
      {/* {tab === 'createposts' && <Createposts />} */}

           {/* posts... */}
      {tab === 'posts' && <DashPosts />}
            {/* users */}
      {tab === 'users' && <DashUsers />}
            {/* comments  */}
      {tab === 'comments' && <DashComments />}
            {/* super admin  */}
      {tab === 'super' && <Setting />}
            {/* social media  */}
      {tab === 'socialmedia' && <SocialMedia />}
            {/* church information  */}
      {tab === 'churchinformation' && <ChurchInformation />}
      {tab === 'dash' && <DashboardComp />}
    
    </div>
  )
}



// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import DashSidebar from '../components/DashSidebar';
// import DashProfile from '../components/DashProfile';
// import DashPosts from '../components/DashPosts';
// import DashUsers from '../components/DashUsers';
// import DashComments from '../components/DashComments';
// import DashboardComp from '../components/DashboardComp';

// export default function Dashboard() {
  // const location = useLocation();
  // const [tab, setTab] = useState('');
  
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const tabFromUrl = urlParams.get('tab');
  //   console.log(tabFromUrl)
  //   if (tabFromUrl) {
  //     setTab(tabFromUrl);
  //   }
  // }, [location.search]);
//   return (
    // <div className='min-h-screen flex flex-col md:flex-row'>
    //   <div className='md:w-56'>
    //     {/* Sidebar */}
    //     {/* <DashSidebar /> */}
    //   </div>
    //   {/* profile... */}
    //   {tab === 'profile' && <DashProfile />}
    
    // </div>
//   );
// }


  // {tab === 'profile' && <DashProfile />}
      // {/* posts... */}
      // {tab === 'posts' && <DashPosts />}
      // {/* users */}
      // {tab === 'users' && <DashUsers />}
      // {/* comments  */}
      // {tab === 'comments' && <DashComments />}
  //     {/* dashboard comp */}
  //     {tab === 'dash' && <DashboardComp />}