import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';

import { Approvepost, create, createprogram, deletepost, getposts, getProgramPosts, getSettings, getUserPostPerMonth, updatepost, updateSetting, uploadProfileImage } from '../controllers/post.controller.js';


// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary.v2,
//   params: {
//     folder: 'profile_images',
//     format: 'jpg',
//   },
// });


const router = express.Router();

router.post('/create', verifyToken, create)
router.post('/createprogram', createprogram)
router.get('/getposts', getposts)
router.get('/getUserPostPerMonth/:userId', getUserPostPerMonth)
router.get('/getProgramPosts', getProgramPosts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId', updatepost)
router.put('/updateSetting/:postIds', updateSetting)
router.put('/Approvepost/:postId', Approvepost)
router.get('/getSettings/', getSettings)
router.post('/profile', uploadProfileImage);


export default router;