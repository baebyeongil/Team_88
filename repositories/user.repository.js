const User = require('../db/models/user');

class UserRepository {
  //회원가입
  async createUser(email, password, nickname) {
    try {
      await User.create({
        email,
        password,
        nickname,
      });
      return {
        status: 200,
        message: '회원가입에 성공했습니다.',
      };
    } catch (err) {
      console.error(err);
      return {
        status: 400,
        message: '회원가입 도중 에러가 발생했습니다.',
      };
    }
  }
  //로그인
  async login(email) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      return user;
    } catch {
      return {
        status: 400,
        message: '로그인 도중 에러가 발생했습니다.',
      };
    }
  }
  //회원탈퇴
  async deleteUser(id) {
    const user = await User.findByPk(id);

    const deleteuser = await user.destroy();
    if (deleteuser) {
      return {
        status: 200,
        message: '회원 탈퇴가 되었습니다.',
      };
    } else {
      return {
        status: 400,
        message: '존재하지 않는 아이디입니다.',
      };
    }
  }
  //회원수정
  async updateUser(updateValues) {
    try {
      await User.update(updateValues, {
        where: { id: updateValues.id },
      });
      return { status: 200, message: '프로필이 업데이트 됐습니다.' };
    } catch (error) {
      return {
        status: 400,
        message: '프로필 업데이트 중 오류가 발생했습니다.',
      };
    }
  }
  //회원 정보 불러오기
  async findUser(userId) {
    try {
      const findUserData = await User.findOne({
        attributes: ['nickname'],
        where: { id: userId },
      });
      return findUserData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
