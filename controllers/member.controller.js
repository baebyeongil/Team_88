const MemberService = require('../services/member.service');

class MemberController {
  memberService = new MemberService();

  findMemberList = async (req, res) => {
    const { boardId } = req.params;

    const result = await this.memberService.findMemberList(boardId);
    return res.status(result.status).json(result.message);
  };
}

module.exports = MemberController;
