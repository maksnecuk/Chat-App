import type { MessageObjectOfServer } from "../chat";
import { createNewMessage } from "../services/createNewMessage";
import { updateExistingMessage } from "../services/updateExistingMessage";

export let existingMsg: Element | null = null;

export function renderMessageTypeMessage(newMessage: MessageObjectOfServer) {
  existingMsg = document.querySelector(`[data-message-id="${newMessage.id}"]`);
  if (existingMsg) {
    updateExistingMessage(newMessage, existingMsg);
  } else {
    createNewMessage(newMessage);
  }
}
