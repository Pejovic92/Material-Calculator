function saveData() {
  let modulName = prompt("Unesi ime modula");
  let fileName = prompt("Unesi ime elementa u formatu: projekat/deo projekta");

  // Initialize formData with model name
  const formData = {
    modelName: `Model: ${modulName}`,
    isWholeBoardMandatory: "No",
    individualElements: [], // Array to hold the data for each row
    summary: {}, // Object to hold the summary data
  };

  const rows = document.querySelectorAll(".input-row");

  // Collecting the summary information outside of the loop
  let materialCost = document.querySelector(".priceOfMaterial").value;
  let sideProcessingCost = document.querySelector(
    ".sideProcessingAmount"
  ).value;
  let areaSum = document.querySelector(".sumField").value;
  let areaSumWithWaste = document.querySelector(".sumWithWasteField").value;
  let sideProcessingLength = document.querySelector(
    ".side-proccessing-field"
  ).value;
  let sideProcessingLengthWithWaste = document.querySelector(
    ".sideProcessingField"
  ).value;
  let totalprice = document.querySelector(".sumPriceFiled").value;
  let totalSideProcessingPrice =
    document.querySelector(".sideProcessingSum").value;
  let sumPrice = document.querySelector(".totalAmmount").value;

  // Assigning summary data once
  formData.summary = {
    materialCostPerMeter2: materialCost,
    sideProcessingCostPerMeter: sideProcessingCost,
    areaSum: areaSum,
    areaSumWithWaste: areaSumWithWaste,
    totalSideProcessingLength: sideProcessingLength,
    totalSideProcessingLengthWithWaste: sideProcessingLengthWithWaste,
    totalMaterialPrice: totalprice,
    totalSideprocessingPrice: totalSideProcessingPrice,
    sumPrice: sumPrice,
  };

  // Processing each row to extract its data
  rows.forEach((row) => {
    const rowNumber = row.querySelector(".rowNumber").innerHTML;
    const nameInput = row.querySelector(".name").value;
    const lengthInput = row.querySelector(".length").value;
    const widthInput = row.querySelector(".width").value;
    const areaResult = row.querySelector(".result").value;
    const sideLength = row.querySelectorAll(".lengthSideCheckbox");
    const sideWidth = row.querySelectorAll(".widthSideCheckbox");
    const sideProcessingResult = row.querySelector(
      ".sideProcessingresult"
    ).value;

    let sideLengthChecked = [];
    let sideWidthChecked = [];

    let sideLengthCheckedArray = Array.from(sideLength);
    let sideWidthCheckedArray = Array.from(sideWidth);

    sideLengthCheckedArray.forEach((el) => {
      sideLengthChecked.push(el.checked);
    });
    sideWidthCheckedArray.forEach((el) => {
      sideWidthChecked.push(el.checked);
    });

    let checkedCountLength = 0;
    sideLength.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedCountLength++;
      }
    });
    let checkedCountWidth = 0;
    sideWidth.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedCountWidth++;
      }
    });

    const rowData = {
      rowNumber: rowNumber,
      name: nameInput,
      length: lengthInput,
      width: widthInput,
      area: areaResult,
      lengthSide1: sideLengthChecked[0],
      lengthSide2: sideLengthChecked[1],
      widthSide1: sideWidthChecked[0],
      widthSide2: sideWidthChecked[1],
      sideProcessingLength: sideProcessingResult,
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
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      reject(new Error("Please select a file."));
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const content = e.target.result;
      const jsonObject = JSON.parse(content);
      resolve(jsonObject);
      const data = { ...jsonObject };
      console.log("Evo data", data);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsText(file);
  });
}

async function writeData() {
  try {
    const data = await readData();

    let newTab = window.open("", "_blank");
    newTab.document.write(`
    <head>
            <link rel="stylesheet" type="text/css" href="style.css">
        </head>
    <h1>${data.modelName}</h1>
    <table border="1">
        <tr>
            <th>Broj elementa</th>
            <th>Ime elementa</th>
            <th>Duzina elementa</th>
            <th>Sirina elementa</th>
            <th>Povrsina elementa</th>
            <th>Kant po duzini</th>
            <th>Kant po sirini</th>
            <th>Duzina kantovanja</th>
        </tr>
       
`);
    // Iterate over each row in the data
    data.individualElements.forEach((row, index) => {
      newTab.document.write(`
        <tr>
        <td>${index + 1}</td>
        <td>${row.name}</td>
        <td>${row.length} mm</td>
        <td>${row.width} mm</td>
        <td>${row.area} m2</td>
        <td>${row.lengthSide} strana/strane</td>
        <td>${row.widthSide} strana/strane</td>
        <td>${row.sideProcessingLength} m</td>
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
            <th>Cena materijala po m2 - rsd</th>
            <th>Cena kantovanja po duznom metru -rsd</th>
            <th>Ukupna povrsina elementa -m2</th>
            <th>Ukupna povrsina elementa sa otpadom -m2</th>
            <th>Ukupna duzina kantovanja -m</th>
            <th>Ukupna duzina kantovanja sa otpadom m</th>
            <th>Ukupna cena materijala -rsd</th>
            <th>Ukupna cena kantovanja -rsd</th>
            <th>Cena izrade modela -rsd</th>
        </tr>
        <tr class='resultData'>
            <td>${data.summary.materialCostPerMeter2}</td>
            <td>${data.summary.sideProcessingCostPerMeter}</td>
            <td>${data.summary.areaSum}</td>
            <td>${data.summary.areaSumWithWaste}</td>
            <td>${data.summary.totalSideProcessingLength}</td>
            <td>${data.summary.totalSideProcessingLengthWithWaste}</td>
            <td>${data.summary.totalMaterialPrice}</td>
            <td>${data.summary.totalSideprocessingPrice}</td>
            <td>${data.summary.sumPrice}</td>
        </tr>
        <!-- Add more rows as needed -->
    </table>
`);
  } catch (error) {
    console.error(error);
  }
}
