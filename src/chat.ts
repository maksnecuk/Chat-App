const nickName = sessionStorage.getItem("nickname");
const roomId = sessionStorage.getItem("roomId");

const chatContainer = document.getElementById("chatContainer");

const messageForm = document.getElementById("messageForm") as HTMLFormElement;
const messageInput = document.getElementById("message") as HTMLInputElement;

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
  const newMessege: messageObjectOfServer = JSON.parse(event.data);

  switch (newMessege.type) {
    case "message":
      const mainContainer = document.createElement("div");
      const nicknameElement = document.createElement("div");
      const messageElement = document.createElement("div");
      const timeElement = document.createElement("div");

      nicknameElement.textContent = newMessege.user.name;
      messageElement.textContent = newMessege.message;
      timeElement.textContent = newMessege.timestamp.slice(11, 16);

      if (newMessege.user.name === nickName) {
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
    /*   KOMMT IRGENDWANN SPATER
    case "image":
      //logic for image
      const mainContainerForImage = document.createElement("div");
      const nicknameByImageElement = document.createElement("div"); 
      const imageContainer = document.createElement("div");
      const timeByImageElement = document.createElement("div");      
      
      nicknameByImageElement.textContent= newMessege.user.name
      imageContainer.te = newMessege.message

      break;*/
    case "system":
      const mainContainerForSystem = document.createElement("div");
      const systemMessageElement = document.createElement("div");

      systemMessageElement.textContent = newMessege.message;
      mainContainerForSystem.appendChild(systemMessageElement);
      mainContainerForSystem.classList.add("sysMessage");

      if (chatContainer) {
        chatContainer.appendChild(mainContainerForSystem);
      }

      break;
  }
};

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
