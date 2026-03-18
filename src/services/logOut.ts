export async function logOut(userId: string) {
  try {
    const response = await fetch(`https://chat.homebin.dev/users/${userId}`, {
      method: "DELETE",
    });

    if (response.status !== 204) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    localStorage.removeItem("nickname");
    localStorage.removeItem("userId");
    window.location.href = "/index.html";
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(errorMessage);
    return null;
  }
}
