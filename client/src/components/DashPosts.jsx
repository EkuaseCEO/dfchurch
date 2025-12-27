
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table, Modal, ModalBody, Select, ModalFooter, ModalHeader, TableHead, TableHeadCell, TableCell, TableRow, TableBody } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { apiFetch } from '../../../src/api';
import { apiFetchBack } from '../../../src/backendapi';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalPost, setShowModalPost] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
   const [clientIdToUpdate, setclientIdToUpdate] = useState('');


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await apiFetch(`/post/getposts`);
        // const data = await res.json();
        if (res) {
          setUserPosts(res.posts);
          if (res.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await apiFetchBack(
        `/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      // const data = await res.json();
      if (res) {
        setUserPosts((prev) => [...prev, ...res.posts]);
        if (res.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    
    try {
      const res = await apiFetchBack(
        `/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      // const data = await res.json();
      if (!res) {
        console.log(res.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };


   const handleUpdate = async () => {
     setShowModalPost(false);
    //  console.log(clientIdToUpdate)
    try {
      
      const res = await fetch(`/api/post/Approvepost/${postIdToDelete}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      //  body: JSON.stringify({
      //   postStatus: 'Approved',
      // }),
        body: JSON.stringify({
        postStatus: clientIdToUpdate,
      }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/posts`);
        // navigate(`/post/${data.slug}`, { replace: true });
        // window.location.reload();
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
   <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableHeadCell>Date updated</TableHeadCell>
              <TableHeadCell>Post image</TableHeadCell>
              <TableHeadCell>Post title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <TableHeadCell>
                <span>Edit</span>
              </TableHeadCell>
             {(currentUser.isAdmin === true || currentUser.isAdmin === "true") && (
  <TableHeadCell>Status</TableHeadCell>
)}
            </TableHead>
            {userPosts.map((post) => (
              <TableBody className='divide-y'>
                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                   
                      <span
                         onClick={() => {
                        setShowModalPost(true);
                        setPostIdToDelete(post._id);
                       
                      }}
                      className='font-medium text-blue-500 hover:underline cursor-pointer'
                      >{post.postStatus}</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
      <Modal
        show={showModalPost}
        onClose={() => setShowModalPost(false)}
        popup
        size='md'
      >
        <ModalHeader />
        <ModalBody>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to Approve this post?
            </h3>

            <form className='flex flex-col gap-4'>
                                <Select className="mb-11"
                                     onChange={(e) => {
                                      const value = e.target.value;
                                      setclientIdToUpdate(value);
                                    }}
                                                        >
                                    <option value='uncategorized'>Select a category</option>
                                    <option value='Approved'>Approve</option>
                                    <option value='Rejected'>Reject</option>
                                  </Select>
                                  </form>

            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleUpdate}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModalPost(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>




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
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}