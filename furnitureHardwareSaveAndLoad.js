
function saveData() {
    let modulName = prompt("Okov: Unesi ime modula");
    let fileName = prompt("Okov :Unesi ime elementa u formatu: projekat/deo projekta");

    const formData = {
        modelName: `Model: ${modulName}`,
        individualElements: [], // Array to hold the data for each row
        summary: {} // Object to hold the summary data
    };

    const rows = document.querySelectorAll('.input-row');

    // Collecting the summary information outside of the loop
    let sumPrice = document.querySelector('.sumPriceAmount').value;

    // Assigning summary data once
    formData.summary = {
        sumPrice: sumPrice
    };

    // Processing each row to extract its data
    rows.forEach(row => {
        const rowNumber = row.querySelector('.rowNumber').innerHTML;
        const name = row.querySelector('.nameInput').value;
        const quantity = row.querySelector('.quantityInput').value;
        const unitPrice = row.querySelector('.priceInput').value;
        const sum = row.querySelector('.valueInput').value;

       
        const rowData = {
            rowNumber:rowNumber,
            name: name,
            quantity: quantity,
            unitPrice: unitPrice,
            sum: sum
        };
        formData.individualElements.push(rowData); // Push row data into rows array
    });

    let jsonData = JSON.stringify(formData, null, 2); // Stringify the entire formData object
    let blob = new Blob([jsonData], { type: "application/json" });
    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = `${fileName}.json`; // Ensure the file has a .json extension
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}



function readData() {
    return new Promise((resolve, reject) => {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        if (!file) {
            reject(new Error('Please select a file.'));
            return;
        }

        const reader = new FileReader();

        reader.onload = function(e) {
            const content = e.target.result;
            const jsonObject = JSON.parse(content);
            resolve(jsonObject);
        };

        reader.onerror = function(error) {
            reject(error);
        };

        reader.readAsText(file);
    });
}

async function writeData() {
try {
    const data = await readData();

    let newTab = window.open('', "_blank");
    newTab.document.write(`
    <head>
            <link rel="stylesheet" type="text/css" href="style.css">
        </head>
    <h1>${data.modelName}</h1>
    <table border="1">
        <tr>
            <th>Redni broj</th>
            <th>Naziv okova</th>
            <th>Kolicina</th>
            <th>Jedinicna cena - rsd</th>
            <th>Ukupna cena - rsd</th>
        </tr>
       
`);
    // Iterate over each row in the data
    data.individualElements.forEach((row, index) => {
        newTab.document.write(`
        <tr>
        <td>${index + 1}</td>
        <td>${row.name} </td>
        <td>${row.quantity} </td>
        <td>${row.unitPrice}</td>
        <td>${row.sum}</td>
    </tr>
        `);
    });
    newTab.document.write(`</table>`);
    newTab.document.write(`<br><hr><br>`);
    newTab.document.write(`
    <head>
            <link rel="stylesheet" type="text/css" href="style.css">
        </head>
        <table class='resultTable' border="1">
        <tr class = 'resultHeader'>
            <th>Ukupna cena okova - rsd</th>
        </tr>
        <tr class='resultData'>
            <td>${data.summary.sumPrice}</td> 

        </tr>
        <!-- Add more rows as needed -->
    </table>
`);


} catch (error) {
    console.error(error);
}
}





