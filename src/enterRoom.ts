const roomsTable = document.getElementById("roomsTable");
roomsTable?.addEventListener("click", (event: MouseEvent) => {
  console.log("click");
  const clickedElement = event.target as HTMLElement;
  const row = clickedElement.closest("tr");
  const roomId = row?.dataset.roomId;
  const roomName = row?.dataset.roomName;
  if (roomId) {
    sessionStorage.setItem("roomId", roomId);
    sessionStorage.setItem("roomName", roomName!);

    if (localStorage.getItem("nickname")) {
      window.location.href = "/chat.html";
    } else {
      alert("Das Feld 'Name' soll ausgefühlt werden");
    }
  }
});
