class Window {
  width;
  height;
  depth;
  boxHeight;
  constructor(width, height, depth, boxHeight) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.boxHeight = boxHeight;
  }
}

class WaterWindow extends Window {
  constructor(width, height, depth, boxHeight) {
    super(width, height, depth, boxHeight);
  }
  //חישוב גובה פתח החלון  - (2-pcs) cm
  calcOpenWindowHeigh() {
    return this.height - this.boxHeight - 6.5;
  }

  //גובה ה הפיתה U (3\3) - (2-pcs) cm
  calcUHeight() {
    return this.height - this.boxHeight - 3.5;
  }

  //חישוב רוחב פיטה עליון ותחתון
  calcUpperWidth() {
    return this.width - 3;
  }
  calcBottomWidth() {
    return this.width - 3;
  }
}

class nonWaterWindow extends Window {
  constructor(width, height, depth, boxHeight) {
    super(width, height, depth, boxHeight);
  }
  //חישוב גובה פתח החלון  - (2-pcs) cm
  calcOpenWindowHeigh() {
    return this.height - this.boxHeight;
  }

  //גובה ה הפיתה U (3\3) - (2-pcs) cm
  calcUHeight() {
    return this.height - this.boxHeight + 3;
  }

  //חישוב רוחב פיטה עליון ותחתון
  calcUpperWidth() {
    return this.width - 3;
  }
  calcBottomWidth() {
    return this.width - 6;
  }
}
class Prekast extends Window {
  constructor(width, height, depth, boxHeight) {
    super(width, height, depth, boxHeight);
  }
  //מידת רוחבהפריקסט
  calcPrekastWidth() {
    return this.width + 9;
  }
  calcPrekastPresa() {
    return this.boxHeight + 4;
  }

  //צדדים
  calcPresaDepthOfSides() {
    return this.depth + 0.7; //תיקון מהלקוח
  }

  //2.11.2021 דרישה מהלקוח
  calcBoxBottomDepth() {
    return this.depth - 3;
  }

  calcHeightSidesOfPrekast() {
    return this.boxHeight;
  }

  //מברשת
  calcMavresht() {
    return this.width + 9 - 0.2;
  }

  //פיטת חיזוק עליון
  calcUpperStrengthFeta() {
    return this.width + 9 - 0.2;
  }

  //עומק תחתון
  calcWidthMeda() {
    return this.width + 9 - 0.2;
  }

  //מידת פריסה
  calcMedatPresa() {
    return this.depth - 2;
  }
}

let choose, win, prekast, width, height, depth, boxHeight;

const withWater = document.getElementById("withWater");
const withOutWater = document.getElementById("withOutWater");
const reset = document.getElementById("reset");

function getInput() {
  width = parseFloat(document.getElementById("width").value); //רוחב
  height = parseFloat(document.getElementById("height").value); //רוחב
  depth = parseFloat(document.getElementById("depth").value); //רוחב
  boxHeight = parseFloat(document.getElementById("boxHeight").value); //רוחב
}
function inputValidation() {
  width = parseFloat(document.getElementById("width").value); //רוחב
  height = parseFloat(document.getElementById("height").value); //רוחב
  depth = parseFloat(document.getElementById("depth").value); //רוחב
  boxHeight = parseFloat(document.getElementById("boxHeight").value); //רוחב
  console.log(width, height, depth, boxHeight);
  if (isNaN(width) || isNaN(height) || isNaN(depth) || isNaN(boxHeight)) {
    alert("שגיאה בקלט, נא לנסות שוב");
    deleteTable();
    hideTitles();
    return -1;
  } else if (width < 0 || height < 0 || depth < 0 || boxHeight < 0) {
    alert("הזנת ערך שלילי נא לבדוק את הקלט שוב");
    deleteTable();
    hideTitles();
    return -1;
  }
  return 1;
}
reset.addEventListener("click", () => {
  deleteTable();
  hideTitles();
});
withWater.addEventListener("click", () => {
  getInput();
  const res = inputValidation();
  if (res == -1) {
    return;
  }
  choose = 1;
  const withOutWater = document.getElementById("withOutWater");
  const print = document.getElementById("print");
  if (withOutWater.classList.contains("active")) {
    withOutWater.classList.toggle("active");
  }
  withWater.classList.toggle("active");
  win = new WaterWindow(width, height, depth, boxHeight);
  prekast = new Prekast(width, height, depth, boxHeight);
  deleteTable();
  initializeDatawithWater();
  showTitles();
  print.classList.add("p-active");
});

withOutWater.addEventListener("click", () => {
  getInput();
  const res = inputValidation();
  if (res == -1) {
    return;
  }
  choose = 2;
  win = new nonWaterWindow(width, height, depth, boxHeight);
  prekast = new Prekast(width, height, depth, boxHeight);
  const withWater = document.getElementById("withWater");
  const print = document.getElementById("print");
  if (withWater.classList.contains("active")) {
    withWater.classList.toggle("active");
  }
  withOutWater.classList.toggle("active");
  deleteTable();
  initializeDatawithOutWater();
  showTitles();
  print.classList.add("p-active");
});

//showing the title up on showing the table results.
function showTitles() {
  const titles = document.getElementById("results");
  const text = titles.querySelectorAll("h2");
  text.forEach((x) => (x.style.display = "block"));
  const inputs_results = document.getElementById("inputs___results");
  console.log(inputs_results);
  inputs_results.style.display = "flex";
  const _height = document.getElementById("inputs___height");
  const _width = document.getElementById("inputs___width");
  const _boxHeight = document.getElementById("inputs___boxHeight");
  const _depth = document.getElementById("inputs___depth");
  _height.querySelector("h3").textContent = height + " cm";
  _width.querySelector("h3").textContent = width + " cm";
  _boxHeight.querySelector("h3").textContent = boxHeight + " cm";
  _depth.querySelector("h3").textContent = depth + " cm";
}
function hideTitles() {
  const titles = document.getElementById("results");
  const text = titles.querySelectorAll("h2");
  text.forEach((x) => (x.style.display = "none"));
  const input_titles = document.getElementById("inputs___results");
  input_titles.style.display = "none";

  //reset forum fields
  var inputArray = document.querySelectorAll("input");
  inputArray.forEach(function (input) {
    input.value = "";
  });

  //reset the buttons choose`
  const withOutWater = document.getElementById("withOutWater");
  const withWater = document.getElementById("withWater");
  if (withOutWater.classList.contains("active")) {
    withOutWater.classList.toggle("active");
  } else if (withWater.classList.contains("active")) {
    withWater.classList.toggle("active");
  }
}

function deleteTable() {
  const tbl = document.querySelector("table");
  tbl.innerHTML = "";
  const tbl2 = document.getElementById("table-results-2");
  tbl2.innerHTML = "";
}
function initializeDatawithOutWater() {
  let windowData = [
    {
      "גובה פתח החלון": win.calcOpenWindowHeigh() + "cm",
      "U (3/3)": win.calcUHeight() + "cm",
      "רוחב פיטה עליון": win.calcUpperWidth() + "cm",
      "(U) חיזוק": win.calcBottomWidth() + "cm",
    },
  ];

  let windowData2 = [
    {
      "מידת רוחב הפריקסט": prekast.calcPrekastWidth() + "cm",
      "מידת פריסת הפריקסט": prekast.calcPrekastPresa() + "cm",
      "מידת פריסת עומק צדדים": prekast.calcPresaDepthOfSides() + "cm",
      "גובה הצדדים של הפרקסט": prekast.calcHeightSidesOfPrekast() + "cm",
      מברשת: prekast.calcMavresht() + "cm",
      "פיטה חיזוק עליון": prekast.calcUpperStrengthFeta() + "cm",
      "עומק תחתון מידת רוחב": prekast.calcWidthMeda() + "cm",
      "עומק תחתון ארגז": prekast.calcBoxBottomDepth() + "cm",
      "מידת פריסה": prekast.calcMedatPresa() + "cm",
    },
  ];
  //window calculation table
  let table = document.querySelector("table");
  let data = Object.keys(windowData[0]);
  generateTableHead(table, data);
  generateTable(table, windowData);

  //prekast calculation table
  let table2 = document.getElementById("table-results-2");
  let data2 = Object.keys(windowData2[0]);
  generateTableHead(table2, data2);
  generateTable(table2, windowData2);
}
function initializeDatawithWater() {
  let windowData = [
    {
      "גובה פתח החלון": win.calcOpenWindowHeigh() + "cm",
      "U (3/3)": win.calcUHeight() + "cm",
      "רוחב פיטה עליון": win.calcUpperWidth() + "cm",
      "רוחב פיטה תחתון": win.calcBottomWidth() + "cm",
    },
  ];

  let windowData2 = [
    {
      "מידת רוחב הפריקסט": prekast.calcPrekastWidth() + "cm",
      "מידת פריסת הפריקסט": prekast.calcPrekastPresa() + "cm",
      "מידת פריסת עומק צדדים": prekast.calcPresaDepthOfSides() + "cm",
      "גובה הצדדים של הפרקסט": prekast.calcHeightSidesOfPrekast() + "cm",
      מברשת: prekast.calcMavresht() + "cm",
      "פיטה חיזוק עליון": prekast.calcUpperStrengthFeta() + "cm",
      "עומק תחתון מידת רוחב": prekast.calcWidthMeda() + "cm",
      "עומק תחתון ארגז": prekast.calcBoxBottomDepth() + "cm",
      "מידת פריסה": prekast.calcMedatPresa() + "cm",
    },
  ];
  //window calculation table
  let table = document.querySelector("table");
  let data = Object.keys(windowData[0]);
  generateTableHead(table, data);
  generateTable(table, windowData);

  //prekast calculation table
  let table2 = document.getElementById("table-results-2");
  let data2 = Object.keys(windowData2[0]);
  generateTableHead(table2, data2);
  generateTable(table2, windowData2);
}
//generating the table fields
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}
