export function sendNewMessage(messageText: string, webSocket: WebSocket) {
  const payload = {
    type: "message",
    message: messageText,
  };
  webSocket.send(JSON.stringify(payload));
}
