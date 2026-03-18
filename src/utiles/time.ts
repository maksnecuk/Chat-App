import type { MessageObjectOfServer } from "../chat";

export function time(newMessage: MessageObjectOfServer) {
  const time = new Date(newMessage.timestamp);
  return time.toLocaleTimeString();
}
