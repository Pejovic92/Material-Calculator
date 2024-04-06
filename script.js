//funkcija za dodavanje reda
let rowCounter = 1;
function addRow() {
    let inputsDiv = document.getElementById('inputs');
    let newInputRow = document.createElement('div');
    newInputRow.className = 'input-row';
    newInputRow.innerHTML = `
    <form>
        <label for="rowNumber" class="rowNumber" >${rowCounter}</label>

        <label for="name" class="nameLabel">Ime elementa:</label>
        <input type="text" class="name valueInput" placeholder="Unesi ime:">

        <label for="length" class="lengthLabel">Duzina (mm):</label>
        <input type="number" class="length valueInput" placeholder="Unesi duzinu:">
        <label for="width" class="widthLabel">Sirina (mm):</label>
        <input type="number" class="width valueInput" placeholder="Unesi sirinu:">
        <label for="result" class="resultLabel">Povrsina (m2)</label>
        <input type="number" class="result valueInput" disabled>
        <label for="lengthSide" class="lengthSideLabel">Kant po duzini:</label>
        <input type="checkbox" class="lengthSideCheckbox">
        <input type="checkbox" class="lengthSideCheckbox">
        <label for="widthSide" class="widthSideLabel">Kant po sirini:</label>
        <input type="checkbox" class="widthSideCheckbox">
        <input type="checkbox" class="widthSideCheckbox">
        <label for="sideProcessing" class="sideProcessingLabel">Duzina kantovanja (m):</label>
        <input type="number" class="sideProcessingresult valueInput" disabled>
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
    resultPlaceholder.value = sum.toFixed(3);
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
    sumResultPlaceholder.value = (resultPlaceholder*materialPrice).toFixed(0);
    console.log(sumResultPlaceholder.value);

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
   sideProcessingSumWithWasteFiled.value = Math.ceil(value); // zaokruzivanje na ceo broj
}

function calculateSideProccessingPrice (){
    let sideProcessingUnitPrice = document.querySelector('.sideProcessingAmount').value;
    let totalSideProcessingLength = document.querySelector('.sideProcessingField').value;
    let resultField = document.querySelector('.sideProcessingSum');
    resultField.value = sideProcessingUnitPrice * totalSideProcessingLength;
}

function calculateTotalPrice(){
    let materialCost = document.querySelector('.sumPriceFiled').value;
    let sideProcessingMaterialCost = document.querySelector('.sideProcessingSum').value;
    let result = document.querySelector('.totalAmmount');
    result.value = parseFloat(materialCost) + parseFloat(sideProcessingMaterialCost);
}


document.addEventListener("DOMContentLoaded", function () {
    let hideWasteSlider = document.getElementById("hideWasteSlider");
    let sumResult = document.querySelector('.sum-result') 
    let sumResultWithWaste = document.querySelector(".sum-result-with-waste");
    let infoText = document.querySelector(".addWasteInfoText");
    let mandatoryArea = document.querySelector(".mandatoryAreaOfBoards");
    let sumAreaPlusWaste = document.querySelector('.areaPlusWaste'); 
    let totalMaterialCostField = document.querySelector('.sumPriceFiled');
    let sideProcessingCost = document.querySelector('.sideProcessingSum');
    let sumPrice = document.querySelector('.totalAmmount');

    mandatoryArea.style.display = "none";
    sumAreaPlusWaste.style.display = "none";
    

    hideWasteSlider.addEventListener("input", function () {
        if (hideWasteSlider.value == 0) {
            sumResultWithWaste.style.display = "flex";
            infoText.style.display = "flex";
            sumResult.style.display = "flex";
            mandatoryArea.style.display = "none";
            sumAreaPlusWaste.style.display = "none";
 
        
        } else if (hideWasteSlider.value == 1) {
            sumResultWithWaste.style.display = "none";
            infoText.style.display = "none";
            sumResult.style.display = "none";
            mandatoryArea.style.display = "flex"
            sumAreaPlusWaste.style.display = "flex";
        
        }
    });

    document.getElementById('hideWasteSlider').addEventListener('input', function() {
        if (this.value > 0) {
          this.classList.add('on');
        } else {
          this.classList.remove('on');
        }
      });  

    // Logic to handle the .calculate button when slider is 1
    document.querySelector('.calculate').addEventListener('click', function() {
        if (parseFloat(hideWasteSlider.value) === 1) {
            let result =  document.querySelector('.mandatoryAreaField');
            let resultPlusWaste = document.querySelector('.areaPlusWasteField');
            let oneBoardArea = Number((2.8 * 2.07).toFixed(3));
            let sumAreaValue = parseFloat(document.querySelector(".sumField").value * 1.1); // dodavanje 10% na povrsinu
            let materialPrice = document.querySelector('.priceOfMaterial');
              
            resultPlusWaste.value = sumAreaValue.toFixed(3);

            if (sumAreaValue >= oneBoardArea) {
                let multiplier = Math.ceil(sumAreaValue / oneBoardArea);
                result.value =  (multiplier * oneBoardArea).toFixed(3);
                totalMaterialCostField.value = (result.value * materialPrice.value).toFixed(0);
            } else {
                result.value = oneBoardArea.toFixed(3);
                totalMaterialCostField.value = (result.value * materialPrice.value).toFixed(0);
            }

            sumPrice.value = Number(totalMaterialCostField.value) + Number(sideProcessingCost.value);
        }
        else if (parseFloat(hideWasteSlider.value) === 0){
            totalMaterialCostField.value = result.value * materialPrice.value;
            sumPrice.value = Number(totalMaterialCostField.value) + Number(sideProcessingCost.value);
        }
    });
});

    let toggleButton = document.getElementById('toggleResults');
    let resultsDiv = document.querySelector('.end-results');
    resultsDiv.style.display = 'none'

    toggleButton.addEventListener('click', function() {
        if (resultsDiv.style.display === 'none') {
            resultsDiv.style.display = 'flex';
        } else {
            resultsDiv.style.display = 'none';
        }
    });

    function openNewPage() {
        window.open("furnitureHardware.html", "_blank");
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

