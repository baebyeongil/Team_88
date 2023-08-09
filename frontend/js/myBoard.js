// 컬럼 그려지는 부분
const myBoard = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const boardId = urlParams.get('id');

  await fetch(`http://localhost:3000/board/${boardId}`, {
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
        let temp_html = `
      <div id="columList" draggable="true">
      <button id="delete-card" onclick="columnDeleteBtn(${id})">X</button>
      <button id="add-card" onclick="cardModarOpen(${id})">+</button>
        <div id="columnTitle">${title}</div>
        <div id="cardList-${i}"></div>
      </div>
      `;
        $('#card-container').append(temp_html);
        // 컬럼안에 카드 그려지는 부분
        for (let j = 0; j < cards.length; j++) {
          let cardTitle = cards[j].title;
          let cardContent = cards[j].content;
          // 카드 내용을 출력하거나 추가하는 코드를 작성하세요
          let card_html = `
              <div class="cards">
                <div>${cardTitle}</div>
                <div>${cardContent}</div>
                <button id="detailCard" onclick="">상세보기</button>
              </div>
            `;
          $(`#cardList-${i}`).append(card_html);
          console.log(cards[j]);
        }
      }
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
    createCard(title);
    $('#myModal').css('display', 'none');
  });

  function createCard(title) {
    // API 요청을 보내는 부분
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('id');

    let columnEndpoint = `http://localhost:3000/board/${boardId}/column`;

    fetch(columnEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Card created:', data);
        location.reload();
        // 실제로 생성된 카드를 화면에 표시하는 로직을 추가할 수 있습니다.
      })
      .catch(error => {
        console.error('Error creating card:', error);
      });
  }
});

// 컬럼 삭제
function columnDeleteBtn(id) {
  const urlParams = new URLSearchParams(window.location.search);
  const boardId = urlParams.get('id');
  const columnId = id;

  fetch(`http://localhost:3000/board/${boardId}/column/${columnId}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      alert(res);
      location.reload();
    });
}

// 카드 생성 모달
function cardModarOpen(id) {
  const columnId = id;
  $('#cardModal').css('display', 'block');

  $('.cardModarClose').click(function () {
    $('#cardModal').css('display', 'none');
  });

  $('#save-card').click(function () {
    let title = $('#card-title').val();
    let content = $('#modal-content').val();
    let workerId = $('#modal-worker').val();
    let deadLine = $('#modal-deadLine').val();
    createCard(content, workerId, deadLine, title);
    $('#cardModal').css('display', 'none');
  });

  // 카드 생성
  function createCard(content, workerId, deadLine, title) {
    // API 요청을 보내는 부분

    let columnEndpoint = `http://localhost:3000/column/${columnId}/card`;

    fetch(columnEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        workerId,
        deadLine,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Card created:', data);
        location.reload();
        // 실제로 생성된 카드를 화면에 표시하는 로직을 추가할 수 있습니다.
      })
      .catch(error => {
        console.error('Error creating card:', error);
      });
  }
}
