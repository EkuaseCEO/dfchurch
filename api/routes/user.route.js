import express from 'express';
import { deleteUser, getUser, getUsers, signout, test, updateUser, updateUserStatus } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test)
router.put('/update/:userId', updateUser);
// router.put('/update/:userId', updateuser);
router.put('/updateUserStatus/:userId', updateUserStatus);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.get('/getusers', verifyToken, getUsers);
// router.get('/getusers', getUsers);
router.post('/signout', signout);
router.get('/:userId', getUser);

export default router