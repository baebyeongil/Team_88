'use strict';
const User = require('./user.js');
const Member = require('./member.js');
const Board = require('./board.js');
const Column = require('./column.js');
const Card = require('./card.js');
const Comment = require('./comment.js');

//User
User.hasMany(Board);
User.hasMany(Member);
User.hasMany(Card);
User.hasMany(Comment);
// Board
Board.hasMany(Member);
Board.hasMany(Comment);
Board.hasMany(Column);
Board.belongsTo(User);
// Member
Member.belongsTo(User);
Member.belongsTo(Board);
//Column
Column.hasMany(Card);
Column.belongsTo(Board);
//Card
Card.hasMany(Comment);
Card.belongsTo(User);
Card.belongsTo(Column);
//Comment
Comment.belongsTo(User);
Comment.belongsTo(Board);
Comment.belongsTo(Card);

module.exports = [User, Member, Board, Card, Comment];
