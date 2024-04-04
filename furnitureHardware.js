
let rowCounter = 1;
function addRow() {
    let inputsDiv = document.getElementById('inputs');
    let newInputRow = document.createElement('div');
    newInputRow.className = 'input-row';
    newInputRow.innerHTML = `
    <form>
        <label for="rowNumber" class="rowNumber" >${rowCounter}</label>
        <label for="name" class="nameLabel">Naziv okova :</label>
        <input type="text" class="name nameInput" placeholder="Unesi ime okova:">
        <label for="quantity" class="quantityLabel">Kolicina:</label>
        <input type="number" class="quantity quantityInput" >
        <label for="price" class="priceLabel"> Jedinicna cena (rsd)</label>
        <input type="number" class="price priceInput">
        <label for="sum" class="sumLabel"> Ukupna cena (rsd):</label>
        <input type="number" class="sum valueInput" disabled>
    </form>
    `;
    inputsDiv.appendChild(newInputRow);
    rowCounter = rowCounter+1
}

function calculatePrice() {
    let rows = document.querySelectorAll('.input-row');

    rows.forEach(row =>{
        let quantity = parseFloat(row.querySelector('.quantityInput').value)
        let unitPrice = parseFloat(row.querySelector('.priceInput').value)
        let price = row.querySelector('.valueInput')
        price.value = quantity*unitPrice;
       
    })
}

function calculateSum(){
    let rows = document.querySelectorAll('.input-row');
    let resultPlaceholder = document.querySelector('.sumPriceAmount')

    let sum=0;
    rows.forEach( row =>{
        let price = parseFloat(row.querySelector('.valueInput').value);
        let sumPrice = document.querySelector('sumPriceAmount');
        sum+= price;
    })
    resultPlaceholder.value = sum;
 
}

function calculateAll(){
    calculatePrice();
    calculateSum();
}
