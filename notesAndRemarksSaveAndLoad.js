
function saveData() {
    let modulName = prompt("Napomene: Unesi ime modula");
    let fileName = prompt("Napomene : Unesi ime napomene i referencu na projekat na koji se odnose napomene");

    const formData = {
        modelName: `Model: ${modulName}`,
        individualElements: [], // Array to hold the data for each row
    };

    const rows = document.querySelectorAll('.input-row');


    // Processing each row to extract its data
    rows.forEach(row => {
        const rowNumber = row.querySelector('.rowNumber').innerHTML;
        const name = row.querySelector('.nameInput').value;


       
        const rowData = {
            rowNumber:rowNumber,
            name: name,
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
    <link rel="stylesheet" type="text/css" href="notesAndRemarks.css">
        </head>
    <h1>${data.modelName}</h1>

     
       
       
`);
    // Iterate over each row in the data
    data.individualElements.forEach((row, index) => {
        newTab.document.write(`

        <h5>${index + 1}&nbsp;&nbsp;&nbsp;${row.name}<h5> 
        `);
    });
   
//     newTab.document.write(`
//     <head>
//             <link rel="stylesheet" type="text/css" href="style.css">
//         </head>
//         <table class='resultTable' border="1">
//         <tr class = 'resultHeader'>
//             <th>Ukupna cena okova - rsd</th>
//         </tr>
//         <tr class='resultData'>
//             <td>${data.summary.sumPrice}</td> 

//         </tr>
//         <!-- Add more rows as needed -->
//     </table>
// `);


} catch (error) {
    console.error(error);
}
}





