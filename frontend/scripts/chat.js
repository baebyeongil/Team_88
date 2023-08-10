const socket = io();
const urlParams = new URL(location.href).searchParams;
const nickname = urlParams.get('nickname');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.querySelector('.chat-messages');

// 메시지 입력란에서 엔터 키를 눌렀을 때 이벤트 처리
messageInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// 전송 버튼 클릭 이벤트 처리
sendButton.addEventListener('click', () => {
  sendMessage();
});

function sendMessage() {
  const messageText = messageInput.value;
  if (messageText.trim() === '') return;

  socket.emit('chat message', [nickname, messageText]);
  messageInput.value = '';
}

socket.on('chat message', msg => {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.innerHTML = `
        <div class="message-sender">${msg[0]}</div>
        <div class="message-text">${msg[1]}</div>
    `;

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
