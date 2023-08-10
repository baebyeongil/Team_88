const MemberRepository = require('../repositories/member.repository');

class MemberService {
  memberRepository = new MemberRepository();

  findMemberList = async boardId => {
    try {
      if (!boardId) {
        return {
          status: 400,
          message: '보드 아이디 값이 입력되지 않았습니다.',
        };
      }
      // const board = await this.boardRepository.1개보드찾는함수
      // if (!board) {
      //   return {
      //     status: 400,
      //     message: '존재하지 않는 보드입니다.',
      //   };
      // }
      const findMemberList = await this.memberRepository.findMemberList(
        boardId
      );
      if (!findMemberList) {
        return {
          status: 400,
          message: '멤버 찾기 실패',
        };
      }
      return {
        status: 200,
        message: findMemberList,
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };
}

module.exports = MemberService;
