const MemberService = require('../services/member.service');

class MemberController {
  memberService = new MemberService();

  postMember = async (req, res) => {
    const { boardId, userId } = req.body;

    const result = await this.memberService.postMember(boardId, userId);
    return res.status(result.status).json(result.message);
  };
}

module.exports = MemberController;
