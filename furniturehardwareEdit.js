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

            // Extract summary data
            const summary = data.summary;

            // Extract individualElements data
            const individualElements = data.individualElements;
        
            // Populate the form with the loaded data
            populateForm(individualElements, summary);
            rowCounter = individualElements.length +1;
        };

        reader.readAsText(file); // Read file as text
    } else {
        alert('Molimo izaberite prethodno sacuvani fajl za učitavanje.');
    }
}

// Function to populate the form with individual elements data
function populateForm(individualElements, summary) {
    const inputsDiv = document.getElementById('inputs');
    inputsDiv.innerHTML = ''; // Clear existing input rows

    // Loop through each element and create input rows
    individualElements.forEach(element => {
        const newInputRow = document.createElement('div');
        newInputRow.className = 'input-row';
        newInputRow.innerHTML = `
            <form>
                <label for="rowNumber" class="rowNumber">${element.rowNumber}</label>
                <label for="name" class="nameLabel">Naziv okova :</label>
                <input type="text" class="name nameInput" value="${element.name}">
                <label for="quantity" class="quantityLabel">Kolicina:</label>
                <input type="number" class="quantity quantityInput" value="${element.quantity}">
                <label for="price" class="priceLabel"> Jedinicna cena (rsd)</label>
                <input type="number" class="price priceInput" value="${element.unitPrice}">
                <label for="sum" class="sumLabel"> Ukupna cena (rsd):</label>
                <input type="number" class="sum valueInput" value="${element.sum}" disabled >

            </form>
        `;
        inputsDiv.appendChild(newInputRow);
    });
    let sum = document.querySelector('.sumPriceAmount');
    sum.value = summary.sumPrice;
}

