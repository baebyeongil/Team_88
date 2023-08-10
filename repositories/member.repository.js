const Member = require('../db/models/member');
const User = require('../db/models/user');

class MemberRepository {
  findMemberList = async boardId => {
    const member = await Member.findAll({
      where: { boardId },
      include: {
        model: User,
        attributes: ['nickname'],
      },
    });
    return member;
  };
}

module.exports = MemberRepository;
