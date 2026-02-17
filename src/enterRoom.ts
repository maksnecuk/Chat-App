const nickNameForm = document.getElementById(
  "createUserNicknameForm",
) as HTMLFormElement;
const nickNameConst = document.getElementById(
  "userNickname",
) as HTMLInputElement;

nickNameForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  const nickName: string = nickNameConst.value;
  sessionStorage.setItem("nickname", nickName);
});

const roomsTable = document.getElementById("roomsTable");
roomsTable?.addEventListener("click", (event: MouseEvent) => {
  const clickedElement = event.target as HTMLElement;
  const row = clickedElement.closest("tr");
  const roomId = row?.dataset.roomId;
  if (roomId) {
    sessionStorage.setItem("roomId", roomId);
    if (sessionStorage.getItem("nickname")) {
      window.location.href = "/chat.html";
    } else {
      alert("Das Feld 'Name' soll ausgefühlt werden");
    }
  }
});
