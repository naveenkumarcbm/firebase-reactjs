const userRouter = require('express').Router()
const auth = require('../auth');
const { loginUser, signUpUser, getUserDetail, updateUserDetails, getAllUsers } = require('../../api/users/index');

userRouter.post('/login', loginUser);
userRouter.post('/signup', auth, signUpUser);
// userRouter.post('/user/image', auth, uploadProfilePhoto);
userRouter.get('/all', auth, getAllUsers);
userRouter.get('/:email', auth, getUserDetail);
userRouter.put('/:email', auth, updateUserDetails);

module.exports = userRouter;