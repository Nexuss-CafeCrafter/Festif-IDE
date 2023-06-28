// Variable to store the path of the loaded file
let loadedFilePath = '';

// Variable to store the current contents of the loaded file
let currentContents = '';

// Event listener for the file input element
document.getElementById('fileInput').addEventListener('change', loadFile);

// Function to handle the file load event
function loadFile(event) {
  const file = event.target.files[0];
  if (!file) {
    console.error('No file selected.');
    return;
  }

  // Create a FileReader object
  const reader = new FileReader();

  // Callback function for when the file is loaded
  reader.onload = function(event) {
    const code = event.target.result;

    // Set the value of an editor (presumably a code editor) with the loaded code
    editor.setValue(code);

    // Update the current contents variable with the loaded code
    currentContents = code;

    // Set the loadedFilePath variable with the name of the loaded file
    loadedFilePath = file.name;

    // Show the "Run" button if the loaded file has an HTML extension
    if (loadedFilePath.endsWith('.html')) {
      document.getElementById('runButton').style.display = 'inline-block';
    } else {
      document.getElementById('runButton').style.display = 'none';
    }
  };

  // Read the contents of the file as text
  reader.readAsText(file);
}

// Function to save the loaded file and open it in a new tab
function saveLoadedFile() {
  if (!loadedFilePath) {
    console.error('No file loaded.');
    return;
  }

  // Send an HTTP POST request to the server with the file path and contents
  fetch('/saveFile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filePath: loadedFilePath,
      fileContents: editor.getValue().toString()
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
  

    }) }
    
// Function to run the loaded file and open it in a new tab
    function runLoadedFile() {
      if (!loadedFilePath) {
        console.error('No file loaded.');
        return;
      }
    
      // Open the current HTML code in a new tab
      const htmlCode = editor.getValue().toString();
      const blob = new Blob([htmlCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      console.log('File opened in a new tab');
    }