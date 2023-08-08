const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/member.controller');

const memberController = new MemberController();

router.post('/:boardId/column', memberController.postMember);
// router.delete('/:boardId/column/:columnId', memberController.deleteMember);

module.exports = router;
