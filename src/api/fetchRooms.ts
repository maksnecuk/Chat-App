export interface AdditionalInfo {
  title?: string;
  topic?: string;
}

export interface Room {
  id: number;
  onlineUser: number;
  additionalInfo?: AdditionalInfo;
}

interface roomsResponse {
  rooms: Room[];
}

export async function fetchRooms(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as unknown as roomsResponse;
    return data.rooms;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(errorMessage);
    return [];
  }
}
