// 컬럼 그려지는 부분
const myBoard = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const boardId = urlParams.get('id');

  await fetch(`/board/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      let rows = data;
      const result = rows.board.columns;
      $('#card-container').empty();
      for (let i = result.length - 1; i >= 0; i--) {
        let title = result[i]['title'];
        let cards = result[i]['cards'];
        let id = result[i]['id'];
        let color = result[i]['color'];
        let temp_html = `
      <div class="columList" id=${id} style="min-height:200px; background-color: ${color}; color: black;" draggable="true" >
        <button id="delete-card" onclick="columnDeleteBtn(${id})">컬럼삭제</button>
        <button id="updateColumnBtn" onclick="updateColumnBtn(${id})">컬럼수정</button>
        <button id="add-card" onclick="cardModarOpen(${id})">카드생성</button>
        <div id="columnTitle">${title}</div>
        <div id="cardList" class="cardList-${i}"></div>
      </div>
      `;
        $('#card-container').append(temp_html);
        // 컬럼안에 카드 그려지는 부분
        for (let j = 0; j < cards.length; j++) {
          let cardTitle = cards[j].title;
          let cardContent = cards[j].content;
          let cardId = cards[j].id;
          let cardColor = cards[j].color;
          // 카드 내용을 출력하거나 추가하는 코드를 작성하세요
          let card_html = `
              <div id=${id},${cardId} class="cards" style=" background-color: ${cardColor}; color: black;" draggable="true">
                <div>${cardTitle}</div>
                <div>${cardContent}</div>
                <div><button id="detailCard" onclick="window.location.href ='card.html?boardId=${boardId}&columnId=${id}&cardId=${cardId}'">상세보기</button></div>
              </div>
            `;
          $(`.cardList-${i}`).append(card_html);
        }
      }
      // board 내용
      $('#boardContent').empty();
      let boardContent = rows.board.content;
      let content_html = `<div>${boardContent}</div>`;
      $(`#boardContent`).append(content_html);

      // 멤버 목록
      fetch(`/board/${boardId}/member`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          let r = data;
          for (let e = r.length - 1; e >= 0; e--) {

            let memberNiname = r[e].user['nickname'];

            let member_html = `<div>${memberNiname}</div>`;
            $('#boardMember').append(member_html);
          }
        });
    });
};

myBoard();

// 컬럼 생성
$(document).ready(function () {
  $('#add-column').click(function () {
    $('#myModal').css('display', 'block');
  });

  $('.columnModarClose').click(function () {
    $('#myModal').css('display', 'none');
  });

  $('#save-column').click(function () {
    let title = $('#modal-title').val();
    let color = $('#colorSelect').val();
    createCard(title, color);
    $('#myModal').css('display', 'none');
  });

  function createCard(title, color) {
    // API 요청을 보내는 부분
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('id');

    let columnEndpoint = `/board/${boardId}/column`;

    fetch(columnEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        color: color,
      }),
    })
      .then(async res => {
        if (res.status == 400) {
          const message = await res.json();
          alert(message);
          // location.reload();
        } else {
          location.reload();
        }
      })
      .catch(error => {
        console.error('Error creating card:', error);
      });
  }
});

// 컬럼 삭제
function columnDeleteBtn(columnId) {
  const urlParams = new URLSearchParams(window.location.search);
  const boardId = urlParams.get('id');

  fetch(`/board/${boardId}/column/${columnId}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(res => {
      alert(res);
      location.reload();
    });
}

// 카드 생성 모달
function cardModarOpen(columnId) {
  $('#cardModal').css('display', 'block');

  $('.cardModarClose').click(function () {
    $('#cardModal').css('display', 'none');
  });

  $('#save-card').click(function () {
    let title = $('#card-title').val();
    let content = $('#modal-content').val();
    let email = $('#modal-worker').val();
    let deadLine = $('#modal-deadLine').val();
    let color = $('#cardColorSelect').val();
    createCard(content, email, deadLine, title, color);
    $('#cardModal').css('display', 'none');
  });

  // 카드 생성
  function createCard(content, email, deadLine, title, color) {
    // API 요청을 보내는 부분

    let columnEndpoint = `/column/${columnId}/card`;

    fetch(columnEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        email,
        deadLine,
        color,
      }),
    })
      .then(async res => {
        if (res.status == 400) {
          const message = await res.json();
          alert(message.result);
          location.reload();
        } else {
          location.reload();
        }
      })
      .catch(error => {
        console.error('Error creating card:', error);
      });
  }
}

// 컬럼 수정 모달
function updateColumnBtn(columnId) {
  const urlParams = new URLSearchParams(window.location.search);
  const boardId = urlParams.get('id');

  $('#columnUpdateModal').css('display', 'block');

  $('.columnUpdateModarClose').click(function () {
    $('#columnUpdateModal').css('display', 'none');
  });

  $('#save-columnUpdate').click(function () {
    let title = $('#column-title').val();
    let color = $('#columnColorSelect').val();
    updateCloumn(title, color);
    $('#columnUpdateModal').css('display', 'none');
  });
  // 카드 생성
  function updateCloumn(title, color) {
    // API 요청을 보내는 부분

    let columnEndpoint = `/board/${boardId}/column/${columnId}`;

    fetch(columnEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        color,
      }),
    })
      .then(res => res.json())
      .then(res => {
        alert(res);
        location.reload();
      });
  }
}

// 초대하기 모달
$(document).ready(function () {
  $('#inviteMember').click(function () {
    $('#inviteMemberModal').css('display', 'block');
  });

  $('.inviteMemberModarClose').click(function () {
    $('#inviteMemberModal').css('display', 'none');
  });

  $('#save-inviteMember').click(function () {
    let email = $('#email').val();
    inviteMember(email);
    $('#inviteMemberModal').css('display', 'none');
  });

  function inviteMember(email) {
    // API 요청을 보내는 부분
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('id');

    let columnEndpoint = `/board/${boardId}`;

    fetch(columnEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then(res => res.json())
      .then(res => {
        alert(res);
        location.reload();
      })
      .catch(error => {
        console.error('Error creating card:', error);
      });
  }
});
