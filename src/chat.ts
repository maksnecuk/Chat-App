const nickName = sessionStorage.getItem("nickname");
const roomId = sessionStorage.getItem("roomId");

const chatContainer = document.getElementById("chatContainer");

const messageForm = document.getElementById("messageForm") as HTMLFormElement;
const messageInput = document.getElementById("message") as HTMLInputElement;
const imageButton = document.getElementById("imageButton") as HTMLButtonElement;
const imageInput = document.getElementById("imageInput") as HTMLInputElement;

if (!nickName || !roomId) {
  window.location.href = "./enterRoom.html";
  throw new Error("Es fehlt einigen Daten");
}

const socketUrl = `wss://chat.homebin.dev/join/${roomId}?user=${nickName}`;
const webSocket = new WebSocket(socketUrl);

interface messageObjectOfServer {
  type: string;
  message: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
  };
}
webSocket.onmessage = (event) => {
  const newMessage: messageObjectOfServer = JSON.parse(event.data);

  switch (newMessage.type) {
    case "message":
      const mainContainer = document.createElement("div");
      const nicknameElement = document.createElement("div");
      const messageElement = document.createElement("div");
      const timeElement = document.createElement("div");

      nicknameElement.textContent = newMessage.user.name;
      messageElement.textContent = newMessage.message;
      timeElement.textContent = newMessage.timestamp.slice(11, 16);

      if (newMessage.user.name === nickName) {
        mainContainer.classList.add("myMessage");
      } else {
        mainContainer.classList.add("otherMessage");
      }
      nicknameElement.classList.add("message-author");
      messageElement.classList.add("message-body");
      timeElement.classList.add("message-time");

      mainContainer.appendChild(nicknameElement);
      mainContainer.appendChild(messageElement);
      mainContainer.appendChild(timeElement);

      if (chatContainer) {
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
      if (nickName === newMessage.user.name) {
        mainContainerForImage.classList.add("myMessage");
      } else {
        mainContainerForImage.classList.add("otherMessage");
      }
      nicknameByImageElement.classList.add("message-author");
      timeByImageElement.classList.add("message-time");
      imageContainer.classList.add("message-body");
      imageContainer.src = newMessage.message;
      imageContainer.style.maxWidth = "100%";
      imageContainer.style.maxHeight = "auto";
      imageContainer.style.display = "block";
      imageContainer.style.borderRadius = "8px";
      imageContainer.style.marginTop = "5px";

      mainContainerForImage.appendChild(nicknameByImageElement);
      mainContainerForImage.appendChild(imageContainer);
      mainContainerForImage.appendChild(timeByImageElement);
      if (chatContainer) {
        chatContainer.appendChild(mainContainerForImage);
      }

      break;
    case "system":
      const mainContainerForSystem = document.createElement("div");
      const systemMessageElement = document.createElement("div");

      systemMessageElement.textContent = newMessage.message;
      mainContainerForSystem.appendChild(systemMessageElement);
      mainContainerForSystem.classList.add("sysMessage");

      if (chatContainer) {
        chatContainer.appendChild(mainContainerForSystem);
      }

      break;
  }
};
imageButton.addEventListener("click", (event: MouseEvent) => {
  imageInput.click();
});

imageInput.addEventListener("change", () => {
  if (imageInput.files && imageInput.files.length > 0) {
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
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
    };

    reader.readAsDataURL(file);
  }
});

messageForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  const messageText = messageInput.value;

  if (webSocket.readyState === WebSocket.OPEN) {
    const payload = {
      type: "message",
      message: messageText,
    };

    webSocket.send(JSON.stringify(payload));

    messageInput.value = "";
  }
});
