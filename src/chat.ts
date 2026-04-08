aboba;

import type { MessageObjectOfServer } from './types.ts';
import { fetchMessage } from './api/fetchMessage.ts';
import {
  renderFunc,
  IdOfEditedMessageSetValue,
  IdOfEditedMessage,
} from './ui/renderMessage.ts';
import { editExistingMessage } from './services/editExistingMessage.ts';
import { sendNewMessage } from './services/sendNewMessage.ts';
import { sendImageMessage } from './services/sendImageMessage.ts';
import { logOut } from './services/logOut.ts';

export const chatContainer = document.getElementById(
  'chatContainer'
) as HTMLDivElement;
export const messageInput = document.getElementById(
  'message'
) as HTMLInputElement;
export const cancelButton = document.getElementById(
  'cancelButton'
) as HTMLButtonElement;
export const logOutButton = document.getElementById(
  'logOutButton'
) as HTMLButtonElement;

const messageForm = document.getElementById('messageForm') as HTMLFormElement;
const headerNicknameDiv = document.getElementById(
  'headerNickname'
) as HTMLDivElement;
const headerRoomNameDiv = document.getElementById(
  'headerRoomName'
) as HTMLDivElement;
const headerRoomNameP = document.createElement('p');
const headerNicknameP = document.createElement('p');
const imageButton = document.getElementById('imageButton') as HTMLButtonElement;
const imageInput = document.getElementById('imageInput') as HTMLInputElement;
const nickName = localStorage.getItem('nickname');
const roomId = sessionStorage.getItem('roomId');
const myId = localStorage.getItem('userId');

if (!nickName || !roomId || !myId) {
  window.location.href = './enterRoom.html';
}

headerRoomNameP.textContent = sessionStorage.getItem('roomName');
headerNicknameP.textContent = nickName;
headerNicknameDiv.appendChild(headerNicknameP);
headerRoomNameDiv.appendChild(headerRoomNameP);
const url = `https://chat.homebin.dev/rooms/${roomId}/messages`;
const socketUrl = `wss://chat.homebin.dev/join/${roomId}?userId=${myId}`;
const webSocket = new WebSocket(socketUrl);
const messagesData = await fetchMessage(url);

for (let message of messagesData) {
  renderFunc(message);
}

webSocket.addEventListener('message', (event) => {
  const newMessage: MessageObjectOfServer = JSON.parse(event.data);
  console.log(newMessage);
  renderFunc(newMessage);
});

imageButton.addEventListener('click', () => {
  imageInput.click();
});

imageInput.addEventListener('change', () => {
  if (imageInput.files && imageInput.files.length > 0) {
    const file = imageInput.files[0];
    sendImageMessage(file, webSocket);
    imageInput.value = '';
  }
});
logOutButton.addEventListener('click', () => {
  logOut(myId!);
});

messageForm.addEventListener('submit', async (event: SubmitEvent) => {
  event.preventDefault();

  const messageText = messageInput.value;
  if (!messageText.trim()) return;

  if (webSocket.readyState === WebSocket.OPEN) {
    if (IdOfEditedMessage) {
      await editExistingMessage(messageText, roomId!, IdOfEditedMessage);
    } else {
      sendNewMessage(messageText, webSocket);
    }
    resetFormState();
  }
});

messageForm.addEventListener('reset', () => {
  resetFormState();
});

function resetFormState() {
  IdOfEditedMessageSetValue(undefined);
  messageInput.value = '';
  cancelButton.classList.add('is-hidden');
}
