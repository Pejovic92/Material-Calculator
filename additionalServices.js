'use strict';

function calculate() {
  const a = +document.querySelector('.first-wall').value;
  const b = +document.querySelector('.second-wall').value;
  const c = +document.querySelector('.diagonal').value;
  const longerWallCheckbox = document.querySelector('.longerSide');
  const shorterWallCheckbox = document.querySelector('.shorterSide');
  const resultContainer = document.querySelector('.menu');

  const ratio = (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b);
  const angleInRadians = Math.acos(ratio);
  const angleInDegrees = angleInRadians * (180 / Math.PI);

  const dilatation = b * Math.tan((angleInDegrees - 90) * (Math.PI / 180));
  let halfDilatation = (angleInDegrees - 90) / 2;

  const markup = `<div class="row">
        <label for="result" class="label additional-services-label">Odstupanje:</label>
      <input type="number" class="result valueInput-additional-services longer" disabled />
    </div>
      `;

  //resultField.value = Math.ceil(dilatation);

  if (longerWallCheckbox.checked && !shorterWallCheckbox.checked) {
    const ratio = (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b);
    const angleInRadians = Math.acos(ratio);
    const angleInDegrees = angleInRadians * (180 / Math.PI);

    const dilatation = a * Math.tan((angleInDegrees - 90) * (Math.PI / 180));

    const existingResult = document.querySelector('.longer');

    if (!existingResult) {
      resultContainer.insertAdjacentHTML('afterend', markup);
      const resultField = document.querySelector('.longer');
      resultField.value = Math.ceil(dilatation);
    }

    const resultField = document.querySelector('.longer');
    resultField.value = Math.ceil(dilatation);
  }

  if (shorterWallCheckbox.checked && !longerWallCheckbox.checked) {
    const ratio = (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b);
    const angleInRadians = Math.acos(ratio);
    const angleInDegrees = angleInRadians * (180 / Math.PI);

    const dilatation = b * Math.tan((angleInDegrees - 90) * (Math.PI / 180));

    const existingResult = document.querySelector('.longer');

    if (!existingResult) {
      resultContainer.insertAdjacentHTML('afterend', markup);
      const resultField = document.querySelector('.longer');
      resultField.value = Math.ceil(dilatation);
    }

    const resultField = document.querySelector('.longer');
    resultField.value = Math.ceil(dilatation);
  }

  if (longerWallCheckbox.checked && shorterWallCheckbox.checked) {
    const ratio = (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b);
    const angleInRadians = Math.acos(ratio);
    const angleInDegrees = angleInRadians * (180 / Math.PI);

    const dilatationA = a * Math.tan(halfDilatation * (Math.PI / 180));
    const dilatationB = b * Math.tan(halfDilatation * (Math.PI / 180));

    const sumDilatation = (dilatationA + dilatationB) / 2;
    console.log('', dilatationA, dilatationB);

    const existingResult = document.querySelector('.longer-wall');

    const markup = `<div class="row">
          <label for="result" class="label additional-services-label">Podeljeno odstupanje - na duzem zidu:</label>
          <input type="number" class="result valueInput-additional-services longer-wall" disabled />
        </div>
                <div class="row">
          <label for="result" class="label additional-services-label">Podeljeno odstupanje - na duzem zidu:</label>
          <input type="number" class="result valueInput-additional-services shorter-wall" disabled />
        </div>`;

    if (!existingResult) {
      resultContainer.insertAdjacentHTML('afterend', markup);
      const resultField = document.querySelector('.longer-wall');
      const resultField2 = document.querySelector('.shorter-wall');
      resultField.value = Math.ceil(dilatationA);
      resultField2.value = Math.ceil(dilatationB);
    }

    const resultField = document.querySelector('.longer-wall');
    const resultField2 = document.querySelector('.shorter-wall');
    resultField.value = Math.ceil(dilatationA);
    resultField2.value = Math.ceil(dilatationB);
  }
}
