import { postApi } from './api/apiClient.ts';
import type { AdditionalInfo } from './types.ts';

const roomForm = document.getElementById('createRoomForm') as HTMLFormElement;

const titleInput = document.getElementById('roomTitle') as HTMLInputElement;
const topicInput = document.getElementById('roomTopic') as HTMLInputElement;

const urlRoomsCreating: string = 'https://chat.homebin.dev/rooms';
async function createRoom(newRoom: AdditionalInfo) {
  try {
    const data = postApi<AdditionalInfo>(urlRoomsCreating, newRoom);
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(errorMessage);
    return [];
  }
}

roomForm.addEventListener('submit', async (event: SubmitEvent) => {
  event.preventDefault();

  const newRoom: AdditionalInfo = {
    title: titleInput.value,
    topic: topicInput.value,
  };
  await createRoom(newRoom);
  roomForm.reset();
});
