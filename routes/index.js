const express = require('express');
const router = express.Router();

const userRouter = require('./user.router');
const boardRouter = require('./board.router');
const cardRouter = require('./card.router');
const columnRouter = require('./column.router');
const commentRouter = require('./comment.router');

router.use('/user', userRouter);
router.use('/board', [boardRouter, columnRouter]);
router.use('/card', commentRouter);
router.use('/column', cardRouter);

module.exports = router;
