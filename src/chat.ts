import { fetchMessage } from "./fetchMessage.ts";
import { renderFunc, IdOfEditedMessageSetValue, IdOfEditedMessage } from "./renderMessage.ts";
import { editExistingMessage } from "./editExistingMessage.ts";
import { sendNewMessage } from "./sendNewMessage.ts";
import { sendImageMessage } from "./sendImageMessage.ts";
import { logOut } from "./logOut.ts";

export const chatContainer = document.getElementById("chatContainer") as HTMLDivElement;
export const messageInput = document.getElementById("message") as HTMLInputElement;
export const cancelButton = document.getElementById("cancelButton") as HTMLButtonElement;
export const logOutButton = document.getElementById("logOutButton") as HTMLButtonElement;

const messageForm = document.getElementById("messageForm") as HTMLFormElement;
const imageButton = document.getElementById("imageButton") as HTMLButtonElement;
const imageInput = document.getElementById("imageInput") as HTMLInputElement;
const nickName = localStorage.getItem("nickname");
const roomId = sessionStorage.getItem("roomId");
const myId = localStorage.getItem("userId");

if (!nickName || !roomId || !myId) {
  window.location.href = "./enterRoom.html";
}

const url = `https://chat.homebin.dev/rooms/${roomId}/messages`;
const socketUrl = `wss://chat.homebin.dev/join/${roomId}?userId=${myId}`;
const webSocket = new WebSocket(socketUrl);
const messagesData = await fetchMessage(url);

export interface MessageObjectOfServer {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
  };
  additionalInfo?: {
    self?: boolean;
    joinedUserId?: string;
    modified?: boolean;
  };
}

for (let message of messagesData) {
  renderFunc(message);
}

webSocket.addEventListener("message", (event) => {
  const newMessage: MessageObjectOfServer = JSON.parse(event.data);
  console.log(newMessage);
  renderFunc(newMessage);
});

imageButton.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", () => {
  if (imageInput.files && imageInput.files.length > 0) {
    const file = imageInput.files[0];
    sendImageMessage(file, webSocket);
    imageInput.value = "";
  }
});
logOutButton.addEventListener("click", () => {
  logOut(myId!);
});

messageForm.addEventListener("submit", async (event: SubmitEvent) => {
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

messageForm.addEventListener("reset", () => {
  resetFormState();
});

function resetFormState() {
  IdOfEditedMessageSetValue(undefined);
  messageInput.value = "";
  cancelButton.classList.add("is-hidden");
}
