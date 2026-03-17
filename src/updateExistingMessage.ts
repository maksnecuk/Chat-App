import type { MessageObjectOfServer } from "./chat";
export function updateExistingMessage(newMessage: MessageObjectOfServer, existingMsg: Element) {
  const contentDiv = existingMsg!.querySelector(`[data-role = "content"]`)!;
  const timeDiv = existingMsg!.querySelector(`[data-role = "time"]`)!;
  contentDiv.textContent = newMessage.message;
  timeDiv.textContent = `edited ${newMessage.timestamp.slice(11, 16)}`;
}
