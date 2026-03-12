const userForm = document.getElementById("createUserNicknameForm") as HTMLFormElement;
const nicknameInput = document.getElementById("userNickname") as HTMLInputElement;

interface User {
  id?: string;
  name: string;
}

async function createUser(newUser: User) {
  try {
    const response = await fetch("https://chat.homebin.dev/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data: User = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(errorMessage);
    return null;
  }
}

userForm.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();

  const newUser: User = {
    name: nicknameInput.value,
  };
  const registeredUser = await createUser(newUser);
  if (registeredUser && registeredUser?.id) {
    sessionStorage.setItem("nickname", registeredUser.name);
    sessionStorage.setItem("userId", registeredUser.id);
    alert(`Nutzer mit der Name: ${newUser.name} wurde erfolgreich registriert!`);
    window.location.href = "/roomAction.html";
  }
  userForm.reset();
});
