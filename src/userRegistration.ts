import type { User } from './types';
import { postApi } from './api/apiClient';
const userForm = document.getElementById('createUserNicknameForm') as HTMLFormElement;
const nicknameInput = document.getElementById('userNickname') as HTMLInputElement;

if (localStorage.getItem('nickname') && localStorage.getItem('userId')) {
  window.location.href = '/roomAction.html';
}

const urlUserCreating: string = 'https://chat.homebin.dev/users';

async function createUser(dataInputUser: User) {
  try {
    const data = postApi<User>(urlUserCreating, dataInputUser);
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(errorMessage);
    return null;
  }
}

userForm.addEventListener('submit', async (event: SubmitEvent) => {
  event.preventDefault();

  const dataInputUser: User = {
    name: nicknameInput.value,
  };

  const registeredUser = await createUser(dataInputUser);

  if (registeredUser && registeredUser?.id) {
    localStorage.setItem('nickname', registeredUser.name);
    localStorage.setItem('userId', registeredUser.id);
    alert(`Nutzer mit der Name: ${dataInputUser.name} wurde erfolgreich registriert!`);
    window.location.href = '/roomAction.html';
  }
  userForm.reset();
});
