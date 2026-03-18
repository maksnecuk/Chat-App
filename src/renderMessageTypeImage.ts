import { chatContainer } from "./chat";
import { myId } from "./renderMessage";
import type { MessageObjectOfServer } from "./chat";
import { time } from "./time";
export function renderMessageTypeImage(newMessage: MessageObjectOfServer) {
  const mainContainerForImage = document.createElement("div");
  const nicknameByImageElement = document.createElement("div");
  const imageContainer = document.createElement("img");
  const timeByImageElement = document.createElement("div");

  nicknameByImageElement.textContent = newMessage.user.name;
  timeByImageElement.textContent = time(newMessage);
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
}
