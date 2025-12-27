import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { Approvepost, create, deletepost, getposts, getProgramPosts, getSettings, getUserPostPerMonth, programposting, updatepost, updateSetting, uploadProfileImage } from '../controllers/post.controller.js';


const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'profile_images',
    format: 'jpg',
  },
});

const upload = multer({ storage });
const router = express.Router();

router.post('/create', verifyToken, create)
router.post('/programposting', verifyToken, programposting)
router.get('/getposts', getposts)
router.get('/getUserPostPerMonth/:userId', getUserPostPerMonth)
router.get('/getProgramPosts', getProgramPosts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId', updatepost)
router.put('/updateSetting/:postIds', updateSetting)
router.put('/Approvepost/:postId', Approvepost)
router.get('/getSettings/', getSettings)
router.post('/profile', upload.single('image'), uploadProfileImage);


export default router;