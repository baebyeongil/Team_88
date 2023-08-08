const router = require('express').Router();
const auth = require('../middleware/auth.js');
const UserController = require('../controllers/user.controller.js');
const userController = new UserController();

router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.delete("/deleteUser",auth, userController.deleteUser);
router.put('/',auth, userController.updateUser);


module.exports = router;
