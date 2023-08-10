document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.querySelector('.login-button');
  const logoutButton = document.querySelector('.logout-button');

  // 쿠키값 확인하여 버튼 상태 설정
  function checkLoginStatus() {
    let cookies = document.cookie;
    if (cookies.includes('Authorization=Bearer%20')) {
      window.location.href = `mypage.html`;
    } else {
      loginButton.classList.remove('d-none'); // 로그인 버튼 표시
      logoutButton.classList.add('d-none'); // 로그아웃 버튼 숨김
    }
  }

  // 페이지 로드 시 쿠키값 확인
  checkLoginStatus();

  logoutButton.addEventListener('click', function () {
    // Axios를 사용하여 POST 요청 보내기
    axios
      .post('/user/logout') // 실제 백엔드 URL로 수정해야 합니다
      .then(response => {
        checkLoginStatus();
      })
      .catch(error => {
        alert(error.request.response);
      });
  });

  // 회원가입
  const signupButton = document.querySelector(
    '#signupModal button.btn-primary'
  );

  signupButton.addEventListener('click', function () {
    // 폼 데이터 수집
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirm = document.querySelector('#confirm').value;
    const nickname = document.querySelector('#nickname').value;

    // 데이터 객체 생성
    const userData = {
      email: email,
      password: password,
      confirm: confirm,
      nickname: nickname,
    };

    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }).then(async res => {
      if (res.status == 400) {
        alert(await res.json());
      } else {
        const successMessage = document.createElement('div');
        successMessage.classList.add('alert', 'alert-success', 'mt-3');
        successMessage.textContent = '회원 가입이 성공적으로 완료되었습니다.';

        const modalBody = document.querySelector('#signupModal .modal-body');
        modalBody.appendChild(successMessage);

        reLoad();
      }
    });
  });

  //로그인
  const modalLoginButton = document.querySelector(
    '#loginModal button.btn-primary'
  );

  modalLoginButton.addEventListener('click', function () {
    // 폼 데이터 수집
    const email = document.querySelector('#email-login').value;
    const password = document.querySelector('#password-login').value;

    // 데이터 객체 생성
    const userData = {
      email: email,
      password: password,
    };

    // Axios를 사용하여 POST 요청 보내기
    axios
      .post('/user/login', userData) // 실제 백엔드 URL로 수정해야 합니다
      .then(response => {
        // 성공 메시지 표시
        const successMessage = document.createElement('div');
        successMessage.classList.add('alert', 'alert-success', 'mt-3');
        successMessage.textContent = '로그인이 성공적으로 완료되었습니다.';

        const modalBody = document.querySelector('#loginModal .modal-body');
        modalBody.appendChild(successMessage);

        window.location.href = `mypage.html`;
      })
      .catch(error => {
        alert(error.request.response);
      });
  });
});

//리로드
reLoad = () => {
  setTimeout(() => {
    location.reload();
  }, 500);
};
