import type { MessageObjectOfServer } from "../chat";
import { chatContainer, cancelButton, messageInput } from "../chat";
import { IdOfEditedMessageSetValue, myId } from "../ui/renderMessage";
import { time } from "../utiles/time";
export function createNewMessage(newMessage: MessageObjectOfServer) {
  const mainContainer = buildBaseMessageDOM(newMessage);
  if (newMessage.user.id === myId) {
    setupMyMessage(mainContainer, newMessage);
  } else {
    setupOtherMessage(mainContainer, newMessage);
  }
  chatContainer.appendChild(mainContainer);
}

function setupMyMessage(mainContainer: HTMLDivElement, newMessage: MessageObjectOfServer) {
  mainContainer.classList.add("myMessage");
  mainContainer.dataset.messageId = newMessage.id;
  mainContainer.dataset.userId = newMessage.user.id;

  mainContainer.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    cancelButton.classList.remove("is-hidden");

    IdOfEditedMessageSetValue(newMessage.id);

    messageInput.value = mainContainer.querySelector(`[data-role = "content"]`)!.textContent ?? "";
  });
}

function setupOtherMessage(mainContainer: HTMLDivElement, newMessage: MessageObjectOfServer) {
  mainContainer.classList.add("otherMessage");
  mainContainer.dataset.messageId = newMessage.id;
  mainContainer.dataset.userId = newMessage.user.id;
}

function buildBaseMessageDOM(newMessage: MessageObjectOfServer): HTMLDivElement {
  const mainContainer = document.createElement("div");
  const nicknameElement = document.createElement("div");
  const messageElement = document.createElement("div");
  const timeElement = document.createElement("div");

  nicknameElement.textContent = newMessage.user.name;

  messageElement.textContent = newMessage.message;
  timeElement.textContent = time(newMessage);

  nicknameElement.classList.add("message-author");
  nicknameElement.dataset.role = "author";
  messageElement.classList.add("message-body");
  messageElement.dataset.role = "content";
  timeElement.classList.add("message-time");
  timeElement.dataset.role = "time";

  mainContainer.appendChild(nicknameElement);
  mainContainer.appendChild(messageElement);
  mainContainer.appendChild(timeElement);

  return mainContainer;
}
