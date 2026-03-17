import type { MessageObjectOfServer } from "./chat";
import { chatContainer } from "./chat";
export function renderMessageTypeSystem(newMessage: MessageObjectOfServer) {
  const mainContainerForSystem = document.createElement("div");
  const systemMessageElement = document.createElement("div");

  systemMessageElement.textContent = newMessage.message;
  mainContainerForSystem.appendChild(systemMessageElement);
  mainContainerForSystem.classList.add("sysMessage");

  chatContainer.appendChild(mainContainerForSystem);
}
