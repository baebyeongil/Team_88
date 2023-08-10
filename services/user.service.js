const UserRepository = require('../repositories/user.repository');
const User = require('../db/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  userRepository = new UserRepository();
  //회원 가입
  createUser = async (email, password, confirm, nickname) => {
    const emailReg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    if (!emailReg.test(email)) {
      return {
        status: 400,
        message: '이메일 형식이 일치하지 않습니다.',
      };
    }
    if (password !== confirm) {
      return { status: 400, message: '패스워드가 일치하지 않습니다.' };
    }
    if (!passwordReg.test(password)) {
      return {
        status: 400,
        message: '비밀번호 형식이 일치하지 않습니다.',
      };
    }
    if (!nickname) {
      return { status: 400, message: '닉네임을 기입하지 않았습니다.' };
    }

    const hashPassword = await bcrypt.hash(password, 5);

    password = hashPassword;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return {
        status: 400,
        message: '이미 사용 중인 이메일입니다.',
      };
    }

    const existingNickname = await User.findOne({ where: { nickname } });

    if (existingNickname) {
      return {
        status: 400,
        message: '이미 사용 중인 닉네임입니다.',
      };
    }

    return await this.userRepository.createUser(email, password, nickname);
  };
  //로그인
  login = async (email, password) => {
    if (!email || !password) {
      return {
        status: 400,
        message: '이메일 혹은 비밀번호를 입력하지 않았습니다.',
      };
    }

    const user = await this.userRepository.login(email);

    if (!user) {
      return {
        status: 400,
        message: '이메일 혹은 비밀번호가 일치하지 않습니다.',
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ id: user.id }, 'custom-secret-key');
      return {
        status: 200,
        message: '로그인이 되었습니다.',
        token,
      };
    } else {
      return {
        status: 400,
        message: '이메일 혹은 비밀번호가 일치하지 않습니다.',
      };
    }
  };
  //회원탈퇴
  deleteUser = async (user, password) => {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return {
        status: 400,
        message: '현재 비밀번호가 일치하지 않습니다.',
      };
    }
    return await this.userRepository.deleteUser(user.id);
  };
  //회원수정
  updateUser = async (user, password, newNickname, newPassword, confirm) => {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return {
        status: 400,
        message: '현재 비밀번호가 일치하지 않습니다.',
      };
    }
    if (newPassword) {
      if (newPassword !== confirm) {
        return { message: '새로운 비밀번호가 일치하지 않습니다.' };
      }
      const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
      if (!passwordReg.test(newPassword)) {
        return { message: '새로운 비밀번호의 형식이 일치하지 않습니다.' };
      }
    }

    const hashPassword = await bcrypt.hash(password, 5);

    let updateValues = {};
    if (user) updateValues.id = user.id;
    if (hashPassword) updateValues.password = hashPassword;
    if (newNickname) updateValues.nickname = newNickname;

    return await this.userRepository.updateUser(updateValues);
  };
  //유저 정보 불러오기
  findUser = async user => {
    try {
      const findUserData = await this.userRepository.findUser(user.id);

      return { status: 200, message: findUserData };
    } catch (error) {
      return {
        status: 400,
        message: 'Repository Error: 불러오기에 실패했습니다.',
      };
    }
  };
}
module.exports = UserService;
