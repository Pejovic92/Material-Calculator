//funkcija za dodavanje reda
let rowCounter = 1;
function addRow() {
    let inputsDiv = document.getElementById('inputs');
    let newInputRow = document.createElement('div');
    newInputRow.className = 'input-row';
    newInputRow.innerHTML = `
    <form>
        <label for="rowNumber" class="rowNumber" >${rowCounter}</label>
        <label for="length">Duzina:</label>
        <input type="number" class="length" placeholder="Unesi duzinu">
        <label for="width">Sirina:</label>
        <input type="number" class="width" placeholder="Unesi sirinu">
        <label for="result">Povrsina</label>
        <input type="number" class="result">
        <label for="lengthSide">Kant po duzini</label>
        <input type="checkbox" class="lengthSideCheckbox">
        <input type="checkbox" class="lengthSideCheckbox">
        <label for="widthSide">Kant po sirini</label>
        <input type="checkbox" class="widthSideCheckbox">
        <input type="checkbox" class="widthSideCheckbox">
        <label for="sideProcessing">Duzina kantovanja</label>
        <input type="number" class="sideProcessingresult">
    </form>
    `;
    inputsDiv.appendChild(newInputRow);
    rowCounter = rowCounter+1
}

function calculateArea() {
    let inputRows = document.querySelectorAll('.input-row');

    inputRows.forEach(function(row) {
        let lengthInput = row.querySelector('.length');
        let widthInput = row.querySelector('.width');
        let resultInput = row.querySelector('.result');

        if (lengthInput && widthInput && resultInput) {
            let length = parseInt(lengthInput.value);
            let width = parseInt(widthInput.value);

            if (!isNaN(length) && !isNaN(width)) {
                let area = (length / 1000) * (width / 1000); 
                resultInput.value = area.toFixed(3);
            } else {
                resultInput.value = '';
            }
        }
    });
}

function calculateSum() {
    let inputRows = document.querySelectorAll('.input-row');

    let sum = 0;
    inputRows.forEach(function(row) {
        let resultInput = row.querySelector('.result');
        if (resultInput) {
            let result = parseFloat(resultInput.value);
            if (!isNaN(result)) {
                sum += result;
            }
        }
    });
    let resultPlaceholder = document.querySelector('.sumField');
    if(resultPlaceholder){
    resultPlaceholder.value = sum.toFixed(3)
    }
}

function calculateSumPlusWaste(){
    let areaSum = document.querySelector('.sumField').value;
    let sumWithWaste = parseFloat(areaSum) + (areaSum * 0.15)
  

    let resultPlaceholder = document.querySelector('.sumWithWasteField');
    resultPlaceholder.value = sumWithWaste.toFixed(2)
}

function calculatePrice() {
    // izracunavanje cene iverice - ovom funkcijom izracunavam cene za kant i materijal
    let materialPrice = document.querySelector('.priceOfMaterial').value;
    let resultPlaceholder = document.querySelector('.sumWithWasteField').value;
    let sumResultPlaceholder = document.querySelector('.sumPriceFiled');
    sumResultPlaceholder.value = (resultPlaceholder*materialPrice).toFixed(0)

    // izracunavanje cene kantovanja
    let sideProcessingUnitPrice = document.querySelector('.sideProcessingAmount').value;
    let totalSideProcessingAmount = document.querySelector('.sideProcessingField').value;
    let totalSideProcessingCostField = document.querySelector('.sideProcessingSum');
    totalSideProcessingCostField.value = sideProcessingUnitPrice * totalSideProcessingAmount;

    
}

function calculateSide() {

    let inputsDiv = document.getElementById('inputs');
    let rows = inputsDiv.querySelectorAll('.input-row');


    rows.forEach(row => {
        let lengthInput = parseFloat(row.querySelector('.length').value) || 0;
        let widthInput = parseFloat(row.querySelector('.width').value) || 0;
        let resultInput = row.querySelector('.sideProcessingresult');

   

        let lengthCheckboxes = Array.from(row.querySelectorAll('.lengthSideCheckbox:checked')).length;
        let widthCheckboxes = Array.from(row.querySelectorAll('.widthSideCheckbox:checked')).length;

        let result = 0;
        if(lengthCheckboxes === 1 && widthCheckboxes=== 1){
            result = lengthInput/1000 + widthInput/1000
          
        } else if (lengthCheckboxes === 2 && widthCheckboxes === 1) {
            result = (lengthInput/1000) * 2 + (widthInput/1000);
           
        } else if (lengthCheckboxes === 1 && widthCheckboxes === 2) {
            result = (lengthInput/1000) + ((widthInput/1000) * 2);
          
        } else if (lengthCheckboxes === 2 && widthCheckboxes === 2) {
            result = ((lengthInput/1000) * 2) + ((widthInput/1000) * 2);
           
        } else if (lengthCheckboxes === 1 && widthCheckboxes === 0) {
            result = lengthInput/1000
           
        } else if (lengthCheckboxes === 2 && widthCheckboxes === 0) {
            result = (lengthInput/1000) * 2
           
        } else if (lengthCheckboxes === 0 && widthCheckboxes === 1) {
            result = widthInput/1000
           
        } else if (lengthCheckboxes === 0 && widthCheckboxes === 2) {
            result = (widthInput/1000)*2
           
        }

        resultInput.value = result.toFixed(2)
    });
}
function calculateSideSum(){
    let inputRows = document.querySelectorAll('.input-row');
    let sideProcessingSum = 0;
    inputRows.forEach(function(row){
        let resultField = row.querySelector('.sideProcessingresult');
        let resultValue = parseFloat(resultField.value)
        sideProcessingSum+=resultValue
    })
    let sideProcessingSumField = document.querySelector('.side-proccessing-field');
    sideProcessingSumField.value = sideProcessingSum.toFixed(2)
}

function calculateSideSumPlusWaste(){
    let sideProcessingValue = document.querySelector('.side-proccessing-field').value;
    let sideProcessingSumWithWasteFiled = document.querySelector('.sideProcessingField');

   let value = parseFloat(parseFloat(sideProcessingValue*0.1)) + parseFloat(sideProcessingValue)
   sideProcessingSumWithWasteFiled.value = Math.round(value); // zaokruzivanje na najblizi ceo broj
}

function calculateSideProccessingPrice (){
    let sideProcessingUnitPrice = document.querySelector('.sideProcessingAmount').value;
    let totalSideProcessingLength = document.querySelector('.sideProcessingField').value;
    let resultField = document.querySelector('.sideProcessingSum');

    console.log("Evo jedinicne cene", sideProcessingUnitPrice)
    console.log("Evo duzine kantovanja",totalSideProcessingLength)

    resultField.value = sideProcessingUnitPrice * totalSideProcessingLength;
    console.log(resultField.value)
}

function calculateTotalPrice(){
    let materialCost = document.querySelector('.sumPriceFiled').value;
    let sideProcessingMaterialCost = document.querySelector('.sideProcessingSum').value;

    let result = document.querySelector('.totalAmmount');
    result.value = parseFloat(materialCost) + parseFloat(sideProcessingMaterialCost);
}

function calculateAll(){
    calculateArea()
    calculateSum()
    calculateSumPlusWaste()
    calculatePrice()    
    calculateSide()
    calculateSideSum()
    calculateSideSumPlusWaste()
    calculateSideProccessingPrice()
    calculateTotalPrice()
}

