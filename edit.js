let rowCounter = 0;
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
            populateForm(individualElements, summary, data);
            rowCounter = individualElements.length +1;
        };

        reader.readAsText(file); // Read file as text
    } else {
        alert('Molimo izaberite prethodno sacuvani fajl za učitavanje.');
    }
}

// Function to populate the form with individual elements data
function populateForm(individualElements, summary, data) {
    const inputsDiv = document.getElementById('inputs');
    inputsDiv.innerHTML = ''; // Clear existing input rows

    // Loop through each element and create input rows
    individualElements.forEach(element => {
        const newInputRow = document.createElement('div');
        newInputRow.className = 'input-row';
        newInputRow.innerHTML = `
            <form>
                <label for="rowNumber" class="rowNumber">${element.rowNumber}</label>
                <label for="name" class="nameLabel">Ime elementa:</label>
                <input type="text" class="name valueInput" value="${element.name}">
                <label for="length" class="lengthLabel">Duzina (mm):</label>
                <input type="number" class="length valueInput" value="${element.length}">
                <label for="width" class="widthLabel">Sirina (mm):</label>
                <input type="number" class="width valueInput" value="${element.width}">
                <label for="result" class="resultLabel">Povrsina (m2):</label>
                <input type="number" class="result valueInput" value="${element.area}">
                <label for="lengthSide" class="lengthSideLabel">Kant po duzini:</label>
                <input type="checkbox" class="lengthSideCheckbox valueInput" ${element.lengthSide ? 'checked' : ''}>
                <input type="checkbox" class="lengthSideCheckbox valueInput" ${element.lengthSide ? 'checked' : ''}>
                <label for="widthSide" class="widthSideLabel">Kant po sirini:</label>
                <input type="checkbox" class="widthSideCheckbox valueInput" ${element.widthSide ? 'checked' : ''}>
                <input type="checkbox" class="widthSideCheckbox valueInput" ${element.widthSide ? 'checked' : ''}>
                <label for="sideProcessingLength" class="sideProcessingLabel">Duzina kantovanja (m):</label>
                <input type="number" class="sideProcessingresult valueInput" value="${element.sideProcessingLength}">
            </form>
        `;
        inputsDiv.appendChild(newInputRow);
    });
 let slider = document.getElementById('hideWasteSlider');
 let results = document.querySelector('.end-results');
 results.style.display = "flex";

 let priceOfMaterial = document.querySelector('.priceOfMaterial');
 let priceOfSideProcessing = document.querySelector('.sideProcessingAmount');
 let areaSum = document.querySelector('.sumField');
 let areaSumePlus10 = document.querySelector('.areaPlusWasteField');
 let nandatoryBoardArea = document.querySelector('.mandatoryAreaField');
 let areaSumPlusWaste = document.querySelector('.sumWithWasteField');
 let sideProcessingLength = document.querySelector('.side-proccessing-field');
 let sideProcessingLengthPlusWaste = document.querySelector('.sideProcessingField');
 let totalMaterialPrice = document.querySelector('.sumPriceFiled');
 let totalSideProcessingPrice = document.querySelector('.sideProcessingSum');
 let sumPrice = document.querySelector('.totalAmmount');

 let sumResult = document.querySelector('.sum-result')
 let sumResultWithWaste = document.querySelector(".sum-result-with-waste");
 let infoText = document.querySelector(".addWasteInfoText");
 let mandatoryArea = document.querySelector(".mandatoryAreaOfBoards");
 let sumAreaPlusWaste = document.querySelector('.areaPlusWaste');
 let saveButton = document.querySelector('.save');
 let writeButton = document.querySelector('.write')
 let saveButtonWholeBoardOption = document.querySelector('.saveWholeBoardOption');
 let writeButtonWholeBoardOption = document.querySelector('.writeWholeBoardOption');
 


 if (data.isWholeBoardMandatory === "Yes"){

    sumResultWithWaste.style.display = "none";
    infoText.style.display = "none";
    sumResult.style.display = "none";
    saveButton.style.display = 'none'
    writeButton.style.display = 'none'
    mandatoryArea.style.display = "flex"
    sumAreaPlusWaste.style.display = "flex";
    saveButtonWholeBoardOption.style.display = 'inline-block';
    writeButtonWholeBoardOption.style.display = 'inline-block';
    slider.value = 1;

    priceOfMaterial.value = summary.materialCostPerMeter2;
    priceOfSideProcessing.value = summary.sideProcessingCostPerMeter;
    areaSumePlus10.value = summary.areaSum;
    nandatoryBoardArea.value = summary.requiredBoardArea;
    sideProcessingLength.value = summary.totalSideProcessingLength;
    sideProcessingLengthPlusWaste.value = summary.totalSideProcessingLengthWithWaste;
    totalMaterialPrice.value = summary.totalMaterialPrice;
    totalSideProcessingPrice.value = summary.totalSideprocessingPrice;
    sumPrice.value = summary.sumPrice;


 } else if(data.isWholeBoardMandatory === "No") {
    priceOfMaterial.value = summary.materialCostPerMeter2;
    priceOfSideProcessing.value = summary.sideProcessingCostPerMeter;
    areaSum.value = summary.areaSum;
    areaSumPlusWaste.value = summary.areaSumWithWaste;
    sideProcessingLength.value = summary.totalSideProcessingLength;
    sideProcessingLengthPlusWaste.value = summary.totalSideProcessingLengthWithWaste;
    totalMaterialPrice.value = summary.totalMaterialPrice;
    totalSideProcessingPrice.value = summary.totalSideprocessingPrice;
    sumPrice.value = summary.sumPrice;
 }
 
}
