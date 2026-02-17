import type { Room } from "./fetchRooms";
import { fetchRooms } from "./fetchRooms";

const container = document.getElementById("listRooms");

function renderRooms(rooms: Room[]): void {
  if (container) container.innerHTML = "";

  for (let room of rooms) {
    const elementRoom = document.createElement("tr");
    elementRoom.dataset.roomId = room.id.toString();
    const titleCell = document.createElement("td");
    const topicCell = document.createElement("td");
    const onlineUserCell = document.createElement("td");

    titleCell.textContent = room.additionalInfo?.title ?? "No name";
    topicCell.textContent = room.additionalInfo?.topic ?? "No topic";
    onlineUserCell.textContent = `${room.onlineUser ?? 0}`;

    elementRoom.appendChild(titleCell);
    elementRoom.appendChild(topicCell);
    elementRoom.appendChild(onlineUserCell);

    if (container) {
      container.appendChild(elementRoom);
    }
  }
}

const roomsData = await fetchRooms("https://chat.homebin.dev/rooms");
renderRooms(roomsData);
