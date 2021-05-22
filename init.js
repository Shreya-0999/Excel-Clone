// ----------- designing the grid
let gridContainer = document.querySelector(".grid_container");
let topLeftBlock = document.querySelector(".topLeftCorner");
let topRow = document.querySelector(".topRow");
let leftColumn = document.querySelector(".leftColumn");
let str = "";
// 1 - 100
for (let i = 0; i < 100; i++) {
    str = str + `<div class = "left-col_box">${i + 1}</div>`
}
leftColumn.innerHTML = (str); 

// A - Z
str = "";
for (let i = 0; i < 26; i++) {
    str += `<div class='col'>${String.fromCharCode(65 + i)}</div>`;
}
topRow.innerHTML = str;

// 2d array
str = "";
let grid = document.querySelector(".grid");
for (let i = 0; i < 100; i++) {
    str = str + `<div class = row>`
    for (let j = 0; j < 26; j++) {
        str = str + `<div class = "col" rid = ${i} cid = ${j} contentEditable = true></div>`
    }
    str = str + "</div>"
}
grid.innerHTML = str;

//Adding scrolling functionality
gridContainer.addEventListener("scroll", function(e){
    let top = gridContainer.scrollTop;
    let left = gridContainer.scrollLeft;
    topLeftBlock.style.top = top + "px";
    topRow.style.top = top + "px";
    topLeftBlock.style.left = left + "px";
    leftColumn.style.left = left + "px";
})


//----------- initializing the values ---------------------------
let worksheetDb = [];
function initCurrentSheetDb() {
    let sheetDb = [];
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            let cellObj = {
                bold: false,
                italic: false,
                underline: false,
                fontFamily: "Arial",
                fontSize: "16px",
                halign: "left",
                value: "", 
                formula: "",
                children:[]
            }
            row.push(cellObj);
        }
        sheetDb.push(row);
    }
    console.log(sheetDb);
    worksheetDb.push(sheetDb);
    console.log(worksheetDb);
}
initCurrentSheetDb();