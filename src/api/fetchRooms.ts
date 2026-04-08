import type { Room } from '../types';
import { getApi } from './apiClient';

export interface roomsResponse {
  rooms: Room[];
}

export async function fetchRooms(url: string): Promise<Room[]> {
  try {
    const data = await getApi<roomsResponse>(url);
    return data.rooms;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(errorMessage);
    return [];
  }
}
