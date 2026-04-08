export async function getApi<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status:${response.status}`);
  }
  return (await response.json()) as T;
}


export function postApi<T>(url:string): Promise<T> {
  const response = await fetch(url){}
}