const urlParams = new URL(location.href).searchParams;
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
    $('#cardBox').empty();
    temp.innerHTML = `<div class="card text-center">
                          <div class="card-header">
                          제목:${cardTitle}
                          <button class="cardDeleteBtn">
                          x
                          </button>
                          </div>
                          <div class="card-body">
                          <h5 class="card-title">내용:${cardContent}</h5>
                          <button id="submitComment" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
                          댓글
                          </button>
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
      const commentId=comment.id
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
  let pixComment=prompt("내용을 입력해주세요")
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
getCard();
getComment();
