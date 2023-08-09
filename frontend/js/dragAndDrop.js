const columnsContainer = document.getElementById('card-container');
let draggingColumn = null;
let dragStartIndex = null;

// 컬럼 드래그 시작 이벤트 리스너
columnsContainer.addEventListener('dragstart', event => {
  draggingColumn = event.target;
  dragStartIndex = Array.from(columnsContainer.children).indexOf(
    draggingColumn
  );
});

// 컬럼 드래그 중 이벤트 리스너
columnsContainer.addEventListener('dragover', event => {
  event.preventDefault();
});

// 컬럼 드롭 이벤트 리스너
columnsContainer.addEventListener('drop', async event => {
  event.preventDefault();

  if (!draggingColumn || dragStartIndex === null) return;

  const droppedColumn = event.target;
  if (droppedColumn.classList.contains('column')) {
    const dragEndIndex = Array.from(columnsContainer.children).indexOf(
      droppedColumn
    );
    console.log(dragEndIndex);

    if (dragStartIndex !== dragEndIndex) {
      // 보드 ID 및 컬럼 ID 가져오기
      const urlParams = new URLSearchParams(window.location.search);
      const boardId = urlParams.get('id');
      const columnIdToMove = draggingColumn.dataset.columnId;

      // 새로운 순서로 컬럼을 이동하는 API 요청 보내기
      try {
        const response = await fetch(
          `/board/${boardId}/column/${columnIdToMove}`,
          {
            method: 'PUT', // 변경이 필요한 경우 PUT 또는 다른 HTTP 메서드 사용
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number: dragEndIndex }),
          }
        );

        if (response.ok) {
          console.log('Column order updated successfully.');
          location.reload(); // 컬럼 순서가 변경되었으므로 화면 다시 로드
        } else {
          console.error('Failed to update column order.');
        }
      } catch (error) {
        console.error('Error while updating column order:', error);
      }
    }

    draggingColumn = null;
    dragStartIndex = null;
  }
});
