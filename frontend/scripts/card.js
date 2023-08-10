const urlParams = new URL(location.href).searchParams;
const boardId = urlParams.get('boardId');
const cardId = urlParams.get('cardId');
const columnId = urlParams.get('columnId');
const commentInput = document.getElementById('commentInput');
const card = fetch(`/column/${columnId}/card/${cardId}`)
  .then(response => response.json())
  .then(data => {
    return data;
  });
const commentList = fetch(`/card/${cardId}/comment`)
  .then(response => response.json())
  .then(data => {
    return data;
  });

const getCard = () => {
  card.then(datas => {
    const temp = document.createElement('div');
    const cardTitle = datas.result.title;
    const cardContent = datas.result.content;
    const cardId = datas.result.id;
    const worker = datas.result.user.nickname;
    const deadLine = datas.result.deadLine;
    const workerEmail = datas.result.user.email;
    $('#cardBox').empty();
    temp.innerHTML = `<div class="card">
                      <div class="card-header d-flex justify-content-between">
                      <span class="card-worker">작업자:${worker}</span>
                      <div>
                      <span class="card-deadLine">마감일:${formatDate(
                        deadLine
                      )}</span>
                      </div>
                      </div>
                      <div class="card-header d-flex justify-content-between">
                      <span>${cardTitle}</span>
                      <div class="btn-group">
                      <button id="cardEditBtn" class="btn btn-primary me-2" style="padding: 0; width: 60px; height: 30px; border-radius: 0; display: flex; align-items: center; justify-content: center;" onclick="openEditModal(${cardId}, '${cardTitle}', '${cardContent}', '${workerEmail}', '${deadLine}')">수정</button>
                      <button id="cardDeleteBtn" class="btn btn-primary" style="padding: 0; width: 60px; height: 30px; border-radius: 0; display: flex; align-items: center; justify-content: center;" onclick="deleteCard(${cardId})">삭제</button>
                      </div>
                      </div>
                      <div class="card-body">
                      <h5 class="card-title" style="margin-left: 20px;">${cardContent}</h5>
                      <div class="d-flex justify-content-end">
                      <button id="submitComment" type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#commentModal">
                      댓글
                      </button>
                      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#checklistModal">체크리스트</button>
                      </div>
                      </div>
                      </div>`;
    document.querySelector('#cardBox').append(temp);
  });
};

function postComment() {
  const req = {
    comment: commentInput.value,
  };

  fetch(`/card/${cardId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then(res => res.json())
    .then(res => {
      alert(res.result);
      window.location.reload();
    });
}

const getComment = () => {
  commentList.then(datas => {
    $('#commentBox').empty();
    datas.result.forEach(comment => {
      const temp = document.createElement('div');
      const content = comment.comment;
      const nickname = comment.user.nickname;
      const commentId = comment.id;
      temp.innerHTML = `<div id="comment" class="container mt-4" style="width: 36rem">
                        <div class="card text-center">
                        <h3>${nickname}</h3><hr/>
                        <div class="card-body">
                        <p class="card-text">${content}</p>
                        </div>
                        <div>
                        <button onclick="updateComment(${commentId})" type="button" class="btn btn-primary">수정</button>
                        <button onclick="deleteComment(${commentId})" type="button" class="btn btn-primary">삭제</button>
                        </div>
                        </div>
                        </div>`;
      document.querySelector('#commentBox').append(temp);
    });
  });
};

function updateComment(commentId) {
  let pixComment = prompt('내용을 입력해주세요');
  const req = {
    comment: pixComment,
  };
  fetch(`/card/${cardId}/comment/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then(res => res.json())
    .then(res => {
      alert(res.result);
      window.location.reload();
    });
}

function deleteComment(commentId) {
  fetch(`/card/${cardId}/comment/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  })
    .then(res => res.json())
    .then(res => {
      alert(res.result);
      window.location.reload();
    });
}

function upadateCard(newTitle, newContent, newEmail, newDeadLine) {
  const req = {
    title: newTitle,
    content: newContent,
    email: newEmail,
    deadLine: newDeadLine,
  };
  fetch(`/column/${columnId}/card/${cardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then(res => res.json())
    .then(res => {
      alert(res.result);
      window.location.reload();
    });
}

function deleteCard(cardId) {
  fetch(`/column/${columnId}/card/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  })
    .then(res => res.json())
    .then(res => {
      alert(res.result);
      window.location.href = `myboard.html?id=${boardId}`;
    });
}
function openEditModal(title, content, email, deadLine) {
  $('#editTitleInput').val(title);
  $('#editContentInput').val(content);
  $('#editWorkerInput').val(email);
  $('#editDeadLineInput').val(deadLine);

  $('#saveEditCardBtn')
    .off('click')
    .on('click', function () {
      const newTitle = $('#editTitleInput').val();
      const newContent = $('#editContentInput').val();
      const newEmail = $('#editWorkerInput').val();
      const newDeadLine = $('#editDeadLineInput').val();

      // 여기서 수정 데이터를 처리하는 함수 호출
      upadateCard(newTitle, newContent, newEmail, newDeadLine);

      // 모달 닫기
      $('#editCardModal').modal('hide');
    });

  $('#editCardModal').modal('show');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
getCard();
getComment();
