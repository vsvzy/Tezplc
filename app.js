function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toLocaleString("ko-KR", { maximumFractionDigits: 1 })} ${units[unitIndex]}`;
}

function setupFilePicker(picker) {
  const fileInput = picker.querySelector("[data-file-input]");
  const dropzone = picker.querySelector(".dropzone");
  const message = picker.querySelector(".message");
  const fileCard = picker.querySelector(".file-card");
  const fileName = picker.querySelector(".file-name");
  const fileSize = picker.querySelector(".file-size");
  const removeFileButton = picker.querySelector(".remove-button");
  const allowedExtensions = picker.dataset.extensions
    .split(",")
    .map((extension) => extension.trim().toLowerCase());
  const allowedTypes = allowedExtensions.join(", ");

  function clearSelection() {
    fileInput.value = "";
    fileCard.hidden = true;
    message.hidden = true;
    message.textContent = "";
  }

  function selectFile(file) {
    if (!file) {
      return;
    }

    const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      fileInput.value = "";
      fileCard.hidden = true;
      message.textContent = `${allowedTypes} 형식의 파일을 선택해 주세요.`;
      message.hidden = false;
      return;
    }

    message.hidden = true;
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    fileCard.hidden = false;
  }

  fileInput.addEventListener("change", () => {
    selectFile(fileInput.files[0]);
  });

  removeFileButton.addEventListener("click", clearSelection);

  dropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropzone.classList.add("is-dragging");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("is-dragging");
  });

  dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropzone.classList.remove("is-dragging");
    selectFile(event.dataTransfer.files[0]);
  });
}

document.querySelectorAll("[data-file-picker]").forEach(setupFilePicker);
