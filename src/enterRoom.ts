const roomsTable = document.getElementById("roomsTable");
roomsTable?.addEventListener("click", (event: MouseEvent) => {
  console.log("click");
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
