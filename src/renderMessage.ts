import { cancelButton, messageInput, chatContainer } from "./chat";
import type { MessageObjectOfServer } from "./chat";
export function renderFunc(newMessage: MessageObjectOfServer, myId?: string, IdOfEditedMessage?: string) {
  const existingMsg = document.querySelector(`[data-message-id="${newMessage.id}"]`);
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
}
