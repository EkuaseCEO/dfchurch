import { useEffect, useState } from 'react';
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, Modal, ModalHeader, ModalBody, Button} from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
HiOutlineExclamationCircle
} from 'react-icons/hi';
import { MdPostAdd } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { signoutSuccess } from '../redux/user/userSlice';
import { CiSettings } from "react-icons/ci";
import { IoShareSocialSharp } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";


export default function DashSidebar() {
    const location = useLocation();
  const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    setShowModal(true);
  };

   

  const ExitApplication = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <Sidebar className='w-full md:w-56'>
        <SidebarItems>
        <SidebarItemGroup className='flex flex-col gap-1'>
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <SidebarItem
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </SidebarItem>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <SidebarItem
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin == "false" ? 'User' : 'Admin'}
              labelColor='dark'
              as='div'
            >
              Profile
            </SidebarItem>
          </Link>
          {currentUser && (
            <Link to='/dashboard?tab=myposts'>
              <SidebarItem
                active={tab === 'myposts'}
                icon={MdPostAdd}
                as='div'
              >
                My Posts
              </SidebarItem>
            </Link>
          )}
          {/* {currentUser && (
            <Link to='/dashboard?tab=createposts'>
              <SidebarItem
                active={tab === 'createposts'}
                icon={MdPostAdd}
                as='div'
              >
                Create Post
              </SidebarItem>
            </Link>
          )} */}
          <SidebarItemGroup>

          {currentUser.isAdmin == "true" && (
            <Link to='/dashboard?tab=posts'>
              <SidebarItem
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >
                All Posts
              </SidebarItem>
            </Link>
          )}
          </SidebarItemGroup>
          {currentUser.isSuperAdmin && (
            <>
              <Link to='/dashboard?tab=users'>
                <SidebarItem
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  All Users
                </SidebarItem>
              </Link>
              <Link to='/dashboard?tab=comments'>
                <SidebarItem
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Posts Comments
                </SidebarItem>
              </Link>
            </>
          )}
          <SidebarItemGroup>

          <SidebarItem
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignout}
          >
            Sign Out
          </SidebarItem>
          </SidebarItemGroup>

          <SidebarItemGroup>
              {currentUser && currentUser.isAdmin == "true" && (
            <Link to='/dashboard?tab=super'>
              <SidebarItem
                active={tab === 'super' || !tab}
                icon={CiSettings}
                as='div'
              >
                Settings
              </SidebarItem>
            </Link>
          )}
          </SidebarItemGroup>
          <SidebarItemGroup>
              {currentUser && currentUser.isAdmin == "true" && (
            <Link to='/dashboard?tab=socialmedia'>
              <SidebarItem
                active={tab === 'socialmedia' || !tab}
                icon={IoShareSocialSharp}
                as='div'
              >
                Social Media
              </SidebarItem>
            </Link>
          )}
          </SidebarItemGroup>
        </SidebarItemGroup>
         <SidebarItemGroup>
              {currentUser && currentUser.isAdmin == "true" && (
            <Link to='/dashboard?tab=churchinformation'>
              <SidebarItem
                active={tab === 'churchinformation' || !tab}
                icon={TbListDetails}
                as='div'
              >
                Church Information
              </SidebarItem>
            </Link>
          )}
          </SidebarItemGroup>
      </SidebarItems>

<Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size='md'
          >
            <ModalHeader />
            <ModalBody>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                  Are you sure you want to Exit this Application?
                </h3>
    
                <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={ExitApplication}>
                    Yes, I'm sure
                  </Button>
                  <Button color='gray' onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>

    </Sidebar>



  )
}






//   return (
    // <Sidebar className='w-full md:w-56'>
      // <Sidebar.Items>
      //   <Sidebar.ItemGroup className='flex flex-col gap-1'>
      //     {currentUser && currentUser.isAdmin && (
      //       <Link to='/dashboard?tab=dash'>
      //         <Sidebar.Item
      //           active={tab === 'dash' || !tab}
      //           icon={HiChartPie}
      //           as='div'
      //         >
      //           Dashboard
      //         </Sidebar.Item>
      //       </Link>
      //     )}
      //     <Link to='/dashboard?tab=profile'>
      //       <Sidebar.Item
      //         active={tab === 'profile'}
      //         icon={HiUser}
      //         label={currentUser.isAdmin ? 'Admin' : 'User'}
      //         labelColor='dark'
      //         as='div'
      //       >
      //         Profile
      //       </Sidebar.Item>
      //     </Link>
      //     {currentUser && (
      //       <Link to='/dashboard?tab=posts'>
      //         <Sidebar.Item
      //           active={tab === 'posts'}
      //           icon={HiDocumentText}
      //           as='div'
      //         >
      //           Posts
      //         </Sidebar.Item>
      //       </Link>
      //     )}
      //     {currentUser.isAdmin && (
      //       <>
      //         <Link to='/dashboard?tab=users'>
      //           <Sidebar.Item
      //             active={tab === 'users'}
      //             icon={HiOutlineUserGroup}
      //             as='div'
      //           >
      //             Users
      //           </Sidebar.Item>
      //         </Link>
      //         <Link to='/dashboard?tab=comments'>
      //           <Sidebar.Item
      //             active={tab === 'comments'}
      //             icon={HiAnnotation}
      //             as='div'
      //           >
      //             Comments
      //           </Sidebar.Item>
      //         </Link>
      //       </>
      //     )}
      //     <Sidebar.Item
      //       icon={HiArrowSmRight}
      //       className='cursor-pointer'
      //       onClick={handleSignout}
      //     >
      //       Sign Out
      //     </Sidebar.Item>
      //   </Sidebar.ItemGroup>
      // </Sidebar.Items>
    // </Sidebar>
//   );
//           }



