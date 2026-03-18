import type { AdditionalInfo } from "./api/fetchRooms";

const roomForm = document.getElementById("createRoomForm") as HTMLFormElement;

const titleInput = document.getElementById("roomTitle") as HTMLInputElement;
const topicInput = document.getElementById("roomTopic") as HTMLInputElement;

async function createRoom(newRoom: AdditionalInfo) {
  try {
    const response = await fetch("https://chat.homebin.dev/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoom),
    });

    const data: AdditionalInfo = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      alert(`Raum mit der Name: ${newRoom.title} und dem Topic: ${newRoom.topic} wurde erfolgreich erstellt!`);
      window.location.href = "/enterRoom.html";
    }

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(errorMessage);
    return [];
  }
}

roomForm.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();

  const newRoom: AdditionalInfo = {
    title: titleInput.value,
    topic: topicInput.value,
  };
  await createRoom(newRoom);
  roomForm.reset();
});
