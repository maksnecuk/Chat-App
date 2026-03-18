import { renderMessageTypeMessage } from "./renderMessageTypeMessage";
import { renderMessageTypeImage } from "./renderMessageTypeImage";
import { renderMessageTypeSystem } from "./renderMessageTypeSystem";
import type { MessageObjectOfServer } from "./chat";

export let IdOfEditedMessage: string | undefined = undefined;
export function IdOfEditedMessageSetValue(IdOfEditedMessageValue: string | undefined) {
  IdOfEditedMessage = IdOfEditedMessageValue;
}
export const myId: string | null = localStorage.getItem("userId");
export function renderFunc(newMessage: MessageObjectOfServer) {
  switch (newMessage.type) {
    case "message":
      renderMessageTypeMessage(newMessage);
      break;

    case "image":
      renderMessageTypeImage(newMessage);
      break;

    case "system":
      renderMessageTypeSystem(newMessage);
      break;
  }
}
