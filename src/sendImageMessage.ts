export function sendImageMessage(file: File, webSocket: WebSocket) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const base64String = reader.result as string;

    if (webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(
        JSON.stringify({
          type: "image",
          message: base64String,
        }),
      );
    }
  });
  reader.readAsDataURL(file);
}
