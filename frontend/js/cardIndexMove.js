// 컬럼 내 카드 이동
const CardsContainer = document.getElementById('card-container');
let draggingCard = null;
let dragStartCardIndex = null;
let dragColumn = null;
// 컬럼 드래그 시작 이벤트 리스너
CardsContainer.addEventListener('dragstart', event => {
  draggingCard = event.target;
  dragStartCardIndex = draggingCard.id;

  dragColumn = draggingCard.parentElement.parentElement;
});

// 컬럼 드래그 중 이벤트 리스너
CardsContainer.addEventListener('dragover', event => {
  event.preventDefault();
});

// 컬럼 드롭 이벤트 리스너
CardsContainer.addEventListener('drop', async event => {
  event.preventDefault();

  if (!draggingCard || dragStartCardIndex === null) return;

  const droppedCard = event.target;

  const dragColumnIndex = Array.from(dragColumn.children[3].children).indexOf(
    droppedCard
  );

  const columnId = dragStartCardIndex.split(',')[0];
  const cardId = dragStartCardIndex.split(',')[1];

  try {
    const response = await fetch(`/column/${columnId}/card/${cardId}/index`, {
      method: 'PATCH', // 변경이 필요한 경우 PUT 또는 다른 HTTP 메서드 사용
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number: dragColumnIndex }),
    });

    if (response.ok) {
      console.log('Column order updated successfully.');
      // location.reload(); // 컬럼 순서가 변경되었으므로 화면 다시 로드
    } else {
      console.error('Failed to update column order.');
    }
  } catch (error) {
    console.error('Error while updating column order:', error);
  }

  draggingCard = null;
  dragStartCardIndex = null;
});
