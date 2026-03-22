import type { MessageObjectOfServer } from "../chat";
import { cancelButton, messageInput } from "../chat";
import { IdOfEditedMessageSetValue } from "./renderMessage";

export function contextMenu(mainContainer?: HTMLDivElement, newMessage?: MessageObjectOfServer) {
  const contexMenu = document.getElementById("contextMenu") as HTMLDivElement;
  const editButtonInContextMenu = document.getElementById("editButtonInContextMenu") as HTMLButtonElement;
  const deleteButtonInContextMenu = document.getElementById("deleteButtonInContextMenu") as HTMLButtonElement;

  contexMenu.classList.remove("is-hidden");

  editButtonInContextMenu.addEventListener("click", () => {
    showEditUI(newMessage!, mainContainer!);
    console.log("aboba");
  });

  deleteButtonInContextMenu.addEventListener("click", () => {
    //deleteMessage()
  });
}

function showEditUI(newMessage: MessageObjectOfServer, mainContainer: HTMLDivElement) {
  cancelButton.classList.remove("is-hidden");
  IdOfEditedMessageSetValue(newMessage.id);
  messageInput.value = mainContainer.querySelector(`[data-role = "content"]`)!.textContent ?? "";
}
