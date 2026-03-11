const nickName = sessionStorage.getItem("nickname");
const roomId = sessionStorage.getItem("roomId");

const chatContainer = document.getElementById("chatContainer") as HTMLDivElement;

let IdOfEditedMessage: string | null = null;

const messageForm = document.getElementById("messageForm") as HTMLFormElement;
const messageInput = document.getElementById("message") as HTMLInputElement;
const imageButton = document.getElementById("imageButton") as HTMLButtonElement;
const imageInput = document.getElementById("imageInput") as HTMLInputElement;
const cancelButton = document.getElementById("cancelButton") as HTMLButtonElement;
if (!nickName || !roomId) {
  window.location.href = "./enterRoom.html";
}

const socketUrl = `wss://chat.homebin.dev/join/${roomId}?user=${nickName}&userInfo=true`;
const webSocket = new WebSocket(socketUrl);

interface MessageObjectOfServer {
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

let myId: string | undefined;

webSocket.addEventListener("message", (event) => {
  const newMessage: MessageObjectOfServer = JSON.parse(event.data);
  const existingMsg = document.querySelector(`[data-message-id="${newMessage.id}"]`);
  if (newMessage.additionalInfo?.self && newMessage.type === "system") {
    myId = newMessage.additionalInfo.joinedUserId;
  }

  switch (newMessage.type) {
    case "message":
      if (existingMsg) {
        const contentDiv = existingMsg.querySelector(`[data-role = "content"]`)!;
        const timeDiv = existingMsg.querySelector(`[data-role = "time"]`)!;
        contentDiv.textContent = newMessage.message;
        timeDiv.textContent = `edited ${newMessage.timestamp.slice(11, 16)}`;
      } else {
        const mainContainer = document.createElement("div");
        const nicknameElement = document.createElement("div");
        const messageElement = document.createElement("div");
        const timeElement = document.createElement("div");

        nicknameElement.textContent = newMessage.user.name;

        messageElement.textContent = newMessage.message;
        timeElement.textContent = newMessage.timestamp.slice(11, 16);

        if (newMessage.user.id === myId) {
          mainContainer.classList.add("myMessage");
          mainContainer.dataset.messageId = newMessage.id;
          mainContainer.dataset.userId = newMessage.user.id;

          mainContainer.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            cancelButton.classList.remove("is-hidden");

            IdOfEditedMessage = newMessage.id;

            messageInput.value = mainContainer.querySelector(`[data-role = "content"]`)!.textContent ?? "";
          });
        } else {
          mainContainer.classList.add("otherMessage");
          mainContainer.dataset.messageId = newMessage.id;
          mainContainer.dataset.userId = newMessage.user.id;
        }

        nicknameElement.classList.add("message-author");
        nicknameElement.dataset.role = "author";
        messageElement.classList.add("message-body");
        messageElement.dataset.role = "content";
        timeElement.classList.add("message-time");
        timeElement.dataset.role = "time";

        mainContainer.appendChild(nicknameElement);
        mainContainer.appendChild(messageElement);
        mainContainer.appendChild(timeElement);
        chatContainer.appendChild(mainContainer);
      }
      break;

    case "image":
      const mainContainerForImage = document.createElement("div");
      const nicknameByImageElement = document.createElement("div");
      const imageContainer = document.createElement("img");
      const timeByImageElement = document.createElement("div");

      nicknameByImageElement.textContent = newMessage.user.name;
      timeByImageElement.textContent = newMessage.timestamp.slice(11, 16);
      if (newMessage.user.id === myId) {
        mainContainerForImage.classList.add("myMessage");
      } else {
        mainContainerForImage.classList.add("otherMessage");
      }
      nicknameByImageElement.classList.add("message-author");
      timeByImageElement.classList.add("message-time");
      imageContainer.classList.add("message-image");
      imageContainer.src = newMessage.message;

      mainContainerForImage.appendChild(nicknameByImageElement);
      mainContainerForImage.appendChild(imageContainer);
      mainContainerForImage.appendChild(timeByImageElement);

      chatContainer.appendChild(mainContainerForImage);
      break;

    case "system":
      const mainContainerForSystem = document.createElement("div");
      const systemMessageElement = document.createElement("div");

      systemMessageElement.textContent = newMessage.message;
      mainContainerForSystem.appendChild(systemMessageElement);
      mainContainerForSystem.classList.add("sysMessage");

      chatContainer.appendChild(mainContainerForSystem);
      break;
  }
});

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

        IdOfEditedMessage = null;
        messageInput.value = "";
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
  IdOfEditedMessage = null;
  messageInput.value = "";
  cancelButton.classList.add("is-hidden");
});
