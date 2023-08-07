const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

const userController = new UserController();

// router.get('/signup', userController.signUp);
// router.get('/signin', userController.signIn);
// router.put('/', userController.updateUser);
// router.delete('/', userController.deleteUser);

module.exports = router;
