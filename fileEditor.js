let loadedFilePath = '';
let currentContents = '';

function loadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    console.error('No file selected.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    const contents = event.target.result;
    document.getElementById('text').value = contents;
    loadedFilePath = fileInput.value;
    currentContents = contents;
  };

  reader.readAsText(file);
}

function saveFile() {
  if (!loadedFilePath) {
    console.error('No file loaded.');
    return;
  }

  const contents = document.getElementById('text').value;
  const blob = new Blob([contents], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = getFileNameFromPath(loadedFilePath);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();

  currentContents = contents;
}

function getFileNameFromPath(filePath) {
  return filePath.split('\\').pop().split('/').pop();
}

document.getElementById('loadButton').addEventListener('click', loadFile);
document.getElementById('saveButton').addEventListener('click', saveFile);

document.getElementById('text').addEventListener('input', function() {
  currentContents = this.value;
  updateLoadedFile(); // Update the loaded file in real-time
});

function updateLoadedFile() {
  if (!loadedFilePath) {
    console.error('No file loaded.');
    return;
  }

  const contents = currentContents;
  const blob = new Blob([contents], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = getFileNameFromPath(loadedFilePath);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}
