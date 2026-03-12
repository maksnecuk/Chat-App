import { fetchMessage } from "./fetchMessage.ts";
import { renderFunc, IdOfEditedMessageSetValue, IdOfEditedMessage } from "./renderMessage.ts";
const nickName = sessionStorage.getItem("nickname");
const roomId = sessionStorage.getItem("roomId");
const myId = sessionStorage.getItem("userId");

export const chatContainer = document.getElementById("chatContainer") as HTMLDivElement;

const messageForm = document.getElementById("messageForm") as HTMLFormElement;
export const messageInput = document.getElementById("message") as HTMLInputElement;
const imageButton = document.getElementById("imageButton") as HTMLButtonElement;
const imageInput = document.getElementById("imageInput") as HTMLInputElement;
export const cancelButton = document.getElementById("cancelButton") as HTMLButtonElement;
if (!nickName || !roomId || !myId) {
  window.location.href = "./enterRoom.html";
}
const url = `https://chat.homebin.dev/rooms/${roomId}/messages`;

const socketUrl = `wss://chat.homebin.dev/join/${roomId}?userId=${myId}`;
const webSocket = new WebSocket(socketUrl);

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

webSocket.addEventListener("message", (event) => {
  const newMessage: MessageObjectOfServer = JSON.parse(event.data);
  renderFunc(newMessage);
  console.log(newMessage);
});

const messagesData = await fetchMessage(url);
for (let message of messagesData) {
  renderFunc(message);
}

imageButton.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", () => {
  if (imageInput.files && imageInput.files.length > 0) {
    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const base64String = reader.result as string;

      if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(
          JSON.stringify({
            type: "image",
            message: base64String,
          }),
        );
        imageInput.value = "";
      }
    });
    reader.readAsDataURL(file);
  }
});

messageForm.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();

  const messageText = messageInput.value;
  if (!messageText.trim()) return;

  if (webSocket.readyState === WebSocket.OPEN) {
    if (IdOfEditedMessage) {
      const url = `https://chat.homebin.dev/rooms/${roomId}/messages/${IdOfEditedMessage}`;
      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: messageText }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error!: ${response.status}`);
        }

        IdOfEditedMessageSetValue(undefined);
        messageInput.value = "";
        cancelButton.classList.add("is-hidden");
      } catch (error) {
        console.error("Error by PATCH:", error);
      }
    } else {
      const payload = {
        type: "message",
        message: messageText,
      };
      webSocket.send(JSON.stringify(payload));
    }
    messageInput.value = "";
  }
});

messageForm.addEventListener("reset", () => {
  IdOfEditedMessageSetValue(undefined);
  messageInput.value = "";
  cancelButton.classList.add("is-hidden");
});
