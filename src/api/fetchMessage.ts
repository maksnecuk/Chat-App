import type { MessageObjectOfServer } from "../chat.ts";
export interface messageResponse {
  messages: MessageObjectOfServer[];
}
export async function fetchMessage(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as unknown as messageResponse;
    return data.messages;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(errorMessage);
    return [];
  }
}
