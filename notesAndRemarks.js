let rowCounter = 1;
function addRow() {
  let inputsDiv = document.getElementById('inputs');
  let newInputRow = document.createElement('div');
  newInputRow.className = 'input-row';
  newInputRow.innerHTML = `
    <form>
        <label for="rowNumber" class="rowNumber" >${rowCounter}</label>
        <label for="name" class="nameLabel">Napomena/zabeleska :</label>
        <input type="text" class="name nameInput" placeholder="Unesi napomenu:">
    </form>
    `;
  inputsDiv.appendChild(newInputRow);
  rowCounter = rowCounter + 1;
}
