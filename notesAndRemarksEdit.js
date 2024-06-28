rowCounter = 1;
// Function to handle file upload and load data onto form
function loadData() {
    const fileInput = document.getElementById('fileInput');

    // Check if a file is selected
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const jsonData = event.target.result;
            const data = JSON.parse(jsonData);

            // Extract individualElements data
            const individualElements = data.individualElements;
        
            // Populate the form with the loaded data
            populateForm(individualElements);
            rowCounter = individualElements.length +1;
        };

        reader.readAsText(file); // Read file as text
    } else {
        alert('Molimo izaberite prethodno sacuvani fajl za učitavanje.');
    }
}

// Function to populate the form with individual elements data
function populateForm(individualElements) {
    const inputsDiv = document.getElementById('inputs');
    inputsDiv.innerHTML = ''; // Clear existing input rows

    // Loop through each element and create input rows
    individualElements.forEach(element => {
        const newInputRow = document.createElement('div');
        newInputRow.className = 'input-row';
        newInputRow.innerHTML = `
        

            <form>
            <label for="rowNumber" class="rowNumber" >${element.rowNumber}</label>
            <label for="name" class="nameLabel">Napomena/zabeleska :</label>
            <input type="text" class="name nameInput" value="${element.name}">
        </form>
        `;
        inputsDiv.appendChild(newInputRow);
        console.log("Evo imena elementa",element.name)
    });
    
}

