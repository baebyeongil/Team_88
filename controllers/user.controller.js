const UserService = require('../services/user.service');

class UserController {
  userService = new UserService();
  //회원가입
  createUser = async (req, res, next) => {
    const { email, password, confirm, nickname } = req.body;

    const createUser = await this.userService.createUser(
      email,
      password,
      confirm,
      nickname
    );
    return res.status(createUser.status).json(createUser.message);
  };

  //로그인
  login = async (req, res, next) => {
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);
    if (token.status === 400) {
      return res.status(token.status).json(token.message);
    } else {
      res.cookie('Authorization', `Bearer ${token.token}`);
      return res.status(token.status).json(token.message);
    }
  };
  //로그아웃
  logout = async (req, res, next) => {
    try {
      res.cookie('Authorization', '');
      return res.status(200).json({ message: '로그아웃이 완료되었습니다.' });
    } catch (error) {
      res.status(404).json({ errorMessage: '로그아웃에 실패했습니다.' });
    }
  };
  //회원탈퇴
  deleteUser = async (req, res, next) => {
    const user = res.locals.user;
    const { password } = req.body;
    const deleteUser = await this.userService.deleteUser(user, password);
    if (deleteUser.status === 400) {
      return res.status(deleteUser.status).json(deleteUser.message);
    } else {
      res.cookie('Authorization', `Bearer ${deleteUser.token}`);
      return res.status(deleteUser.status).json(deleteUser.message);
    }
  };
  //회원수정
  updateUser = async (req, res, next) => {
    const user = res.locals.user;
    const { password, newNickname, newPassword, confirm } = req.body;
    const updateUser = await this.userService.updateUser(
      user,
      password,
      newNickname,
      newPassword,
      confirm
    );
    return res.status(updateUser.status).json(updateUser.message);
  };
}

module.exports = UserController;
