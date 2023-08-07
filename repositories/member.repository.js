const Member = require('../db/models/member');

class MemberRepository {
  postMember = async (boardId, userId) => {
    const member = await Member.create({
      boardId,
      userId,
    });
    return member;
  };
}

module.exports = MemberRepository;
