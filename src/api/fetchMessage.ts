import type { MessageObjectOfServer } from '../types.ts';
import { getApi } from './apiClient.ts';

interface messageResponse {
  messages: MessageObjectOfServer[];
}

export async function fetchMessage(
  url: string
): Promise<MessageObjectOfServer[]> {
  try {
    const data = await getApi<messageResponse>(url);
    return data.messages;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(errorMessage);
    return [];
  }
}
