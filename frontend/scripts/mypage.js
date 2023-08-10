//보드 상세페이지로 이동하는 버튼에 대한 동적 생성
document.addEventListener('DOMContentLoaded', function () {
  // 로그인 판별 여부
  const chatButton = document.querySelector('.chat-button');
  const logoutButton = document.querySelector('.logout-button');

  // 쿠키값 확인하여 버튼 상태 설정
  function checkLoginStatus() {
    let cookies = document.cookie;
    if (!cookies.includes('Authorization=Bearer%20')) {
      window.location.href = `main.html`;
    }
  }

  // 페이지 로드 시 쿠키값 확인
  checkLoginStatus();

  chatButton.addEventListener('click', function () {
    axios
      .get('/user')
      .then(response => {
        window.location.href = `chat.html?nickname=${response.data.result.nickname}`;
      })
      .catch(error => {
        console.log(error);
        alert(error.request.response);
      });
  });

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
      console.log(res);
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
        button.id = `${res[i].boardId}`;
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

  //내 정보 수정
  document.getElementById('saveChanges').addEventListener('click', function () {
    const password = document.getElementById('password').value;
    const newNickname = document.getElementById('newNickname').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirm').value;

    const newUserData = {
      password: password,
      newNickname: newNickname,
      newPassword: newPassword,
      confirm: confirm,
    };

    axios
      .put('/user', newUserData) // 실제 백엔드 URL로 수정해야 합니다
      .then(response => {
        // 성공 메시지 표시
        const successMessage = document.createElement('div');
        successMessage.classList.add('alert', 'alert-success', 'mt-3');
        successMessage.textContent = '회원정보가 성공적으로 수정되었습니다.';

        const modalFooter = document.querySelector('#editModal .modal-footer');
        modalFooter.insertAdjacentElement('beforebegin', successMessage);

        reLoad();
      })
      .catch(error => {
        alert(
          '회원 정보 수정에 실패했습니다. 닉네임에는 쉼표(,)를 사용할 수 없습니다. 비밀번호를 확인하거나, 빈 칸을 채워주세요.'
        );
      });
  });

  //회원 탈퇴
  document.getElementById('deleteUser').addEventListener('click', function () {
    const password = document.getElementById('password').value;

    axios
      .delete('/user/deleteUser', {
        headers: {
          password: `${password}`,
        },
      })
      .then(response => {
        // 성공 메시지 표시
        const successMessage = document.createElement('div');
        successMessage.classList.add('alert', 'alert-success', 'mt-3');
        successMessage.textContent = '회원탈퇴가 성공적으로 수행되었습니다.';

        const modalFooter = document.querySelector('#editModal .modal-footer');
        modalFooter.insertAdjacentElement('beforebegin', successMessage);

        window.location.href = `mypage.html`;
      })
      .catch(error => {
        alert('비밀번호를 확인해주세요.');
      });
  });
});

//리로드
reLoad = () => {
  setTimeout(() => {
    location.reload();
  }, 700);
};
