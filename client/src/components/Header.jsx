import { 
  Avatar, 
  Button, Dropdown, Navbar, 
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  TextInput, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle,  Modal, ModalHeader, ModalBody } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaReact, FaMoon, FaSun  } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toggleTheme } from '../redux/theme/themeSlice';
import { apiFetch } from '../../../src/api';


function Header() {
    const dispatch = useDispatch();
    const path = useLocation.pathname;
    const navigate = useNavigate();
    const loc = useLocation();

    const { currentUser } = useSelector(state => state.user)
    const { theme } = useSelector((state) => state.theme);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
   
   useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);


   

const handleSignout = async () => {
    setShowModal(true);
  };

   

  const ExitApplication = async () => {
    try {
      const res = await apiFetch('/user/signout', {
        method: 'POST',
      });
      // const data = await res.json();
        dispatch(signoutSuccess());
        setShowModal(false);

      // if (res) {
      //   // console.log(res.message);
      //   setShowModal(false);
      // } else {
      //   dispatch(signoutSuccess());
      //    setShowModal(false);
      // }
    } catch (error) {
      console.log(error.message);
    }
  }









    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };
  
  
    return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowarp text-sm:text-xl font-semibold dark:text-white'>
            {/* <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>DFC</span> */}
          <img src='../Rccg_logo.png' className='h-10 w-10' alt='RCCG Logo' />
        </Link>
        
        <form onSubmit={handleSubmit} >
            <TextInput 
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray'  pill > 
        <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
           <Button className='w-12 h-10 hidden sm:inline' color='gray' pill 
                       onClick={() => dispatch(toggleTheme())}>
                          {theme === 'light' ? <FaSun /> :  <FaMoon />}
                       </Button>

        {currentUser ? (
        <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="Userprofile" img={currentUser.profilePicture} rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">@{currentUser.username}</span>
            <span className="block truncate text-sm font-medium">@{currentUser.email}</span>
          </DropdownHeader>
          <DropdownItem>
             <Link to={'/Dashboard?tab=profile'}>
            Dashboard
            </Link>
            </DropdownItem>
          {/* <DropdownItem>Settings</DropdownItem> */}
          <DropdownDivider />
          <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
       ) : (
          <Link to='/SignIn'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}

      
         <NavbarToggle />
        </div>
       <NavbarCollapse>
        <NavbarLink  href="/" active={loc.pathname === "/"}>
          Home
        </NavbarLink>
        <NavbarLink href="/About" active={loc.pathname === "/About"}>
          About
        </NavbarLink>
        <NavbarLink href="/Recent" active={loc.pathname === "/Recent"}>Updates</NavbarLink>
        <NavbarLink href="/">Give</NavbarLink>
        <NavbarLink href="/">Food Bank</NavbarLink>
        <NavbarLink href="/Contact">Contact</NavbarLink>
        {currentUser ? 
        <NavbarLink href="/create-post" active={loc.pathname === "/create-post"}>Create Post</NavbarLink>
        : ""
      }
      </NavbarCollapse>


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


    </Navbar>
  )
}

export default Header

// import React from 'react'

// export default function Header() {
//   return (
//     <div>Header</div>
//   )
// }
