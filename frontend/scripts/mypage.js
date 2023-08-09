//보드 상세페이지로 이동하는 버튼에 대한 동적 생성
document.addEventListener('DOMContentLoaded', function () {
  // 로그인 판별 여부
  const loginButton = document.querySelector('.login-button');
  const logoutButton = document.querySelector('.logout-button');

  // 쿠키값 확인하여 버튼 상태 설정
  function checkLoginStatus() {
    let cookies = document.cookie;
    if (cookies.includes('Authorization=Bearer%20')) {
      loginButton.classList.add('d-none'); // 로그인 버튼 숨김
      logoutButton.classList.remove('d-none'); // 로그아웃 버튼 표시
    } else {
      window.location.href = `main.html`;
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

  let res;
  axios
    .get('/board') // 실제 백엔드 URL로 수정해야 합니다
    .then(response => {
      res = response.data;
      const boardButtonsContainer = document.querySelector('.board-buttons');

      // 버튼 클릭 이벤트 리스너 추가
      boardButtonsContainer.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('btn-outline-secondary')) {
          window.location.href = `myboard.html?id=${target.id}`;
        }
      });
      for (let i = 0; i < res.length; i++) {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-secondary');
        button.style.marginLeft = '20px';
        button.style.marginTop = '20px';
        button.style.width = '120px';
        button.style.height = '80px';
        button.textContent = `${res[i].board.title}`;
        button.id = `${res[i].id}`;
        boardButtonsContainer.appendChild(button);
      }
    })
    .catch(error => {
      alert(error.request.response);
    });

  const createBoardButton = document.querySelector('#createBoardButton');
  const createBoardModal = new bootstrap.Modal(
    document.getElementById('createBoardModal')
  );
  const submitBoardButton = document.querySelector('#submitBoard');
  const boardTitleInput = document.querySelector('#boardTitle');
  const boardContentInput = document.querySelector('#boardContent');

  // 모달 창 열기
  createBoardButton.addEventListener('click', function () {
    createBoardModal.show();
  });

  // 보드 생성 버튼 클릭 이벤트
  submitBoardButton.addEventListener('click', function () {
    const newBoardData = {
      title: boardTitleInput.value,
      content: boardContentInput.value,
    };

    // 데이터를 백엔드로 보내는 코드 (Axios 사용)
    axios
      .post('/board', newBoardData) // 실제 백엔드 URL로 수정해야 합니다
      .then(response => {
        // 성공 메시지 표시
        const successMessage = document.createElement('div');
        successMessage.classList.add('alert', 'alert-success', 'mt-3');
        successMessage.textContent = '보드가 성공적으로 생성되었습니다.';

        const modalFooter = document.querySelector(
          '#createBoardModal .modal-footer'
        );
        modalFooter.insertAdjacentElement('beforebegin', successMessage);
        // 보드 생성에 성공한 경우, 생성된 보드를 화면에 추가
        reLoad();
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
