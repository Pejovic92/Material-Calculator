function uploadJSONFiles() {
  const fileInput = document.getElementById("jsonFiles");
  const files = fileInput.files;

  if (files.length === 0) {
    alert("Please select at least one JSON file");
    return;
  }

  Array.from(files).forEach((file) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        const jsonContent = JSON.parse(e.target.result);
        console.log(`Contents of ${file.name}:`, jsonContent);
      } catch (err) {
        console.error(`Invalid JSON in ${file.name}:`, err);
      }
    };

    reader.readAsText(file);
  });
}
