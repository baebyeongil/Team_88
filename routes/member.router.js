const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/member.controller');

const memberController = new MemberController();

router.get('/:boardId/member', memberController.findMemberList);

module.exports = router;
