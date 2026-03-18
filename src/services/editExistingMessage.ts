export async function editExistingMessage(messageText: string, roomId: string, IdOfEditedMessage: string) {
  const url = `https://chat.homebin.dev/rooms/${roomId}/messages/${IdOfEditedMessage}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageText }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error!: ${response.status}`);
    }
  } catch (error) {
    console.error("Error by PATCH:", error);
  }
}
