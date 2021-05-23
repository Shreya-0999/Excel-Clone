// MENU CONTAINER
let boldBtn = document.querySelector(".bold");
let italicBtn = document.querySelector(".italic");
let underlineBtn = document.querySelector(".underline");
let fontFamily = document.querySelector(".font-family");
let fontSize = document.querySelector(".font-size");
let leftBtn = document.querySelector(".left");
let centerBtn = document.querySelector(".center");
let rightBtn = document.querySelector(".right");
let textColorBtn = document.querySelector("#color");
let backgroundColorBtn = document.querySelector("#bg-color");
let allAlignBtns = document.querySelectorAll(".alignment_container>*");

// FORMULA CONTAINER
addressBar = document.querySelector(".address_bar");
formulaInput = document.querySelector(".formula_bar");

// GRID CONTAINER
AllCells = document.querySelectorAll(".grid .col");

// SHEET CONTAINER
let add_btn = document.querySelector(".add_btn_container");
let sheetList = document.querySelector(".sheet_list");
let firstSheet = document.querySelector(".sheet");
let sheetDb = worksheetDb[0];

/* ********************* MENU CONTAINER********************************** */
boldBtn.addEventListener("click", function () {
    let isActive = boldBtn.classList.contains("active_icon");
    let { rid, cid } = getRidCidfromAddress(addressBar.innerText);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    let cellObject = sheetDb[rid][cid];
    if (isActive) {
        boldBtn.classList.remove("active_icon");
        cell.style.fontWeight = "normal";
        cellObject.bold = false;
    } else {
        boldBtn.classList.add("active_icon");
        cell.style.fontWeight = "bold";
        cellObject.bold = true;
    }
})

italicBtn.addEventListener("click", function () {
    let isActive = italicBtn.classList.contains("active_icon");
    let { rid, cid } = getRidCidfromAddress(addressBar.innerText);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    let cellObject = sheetDb[rid][cid];
    if (isActive) {
        italicBtn.classList.remove("active_icon");
        cell.style.fontStyle = "normal";
        cellObject.italic = false;
    } else {
        italicBtn.classList.add("active_icon");
        cell.style.fontStyle = "italic";
        cellObject.italic = true;
    }
})

underlineBtn.addEventListener("click", function () {
    let isActive = underlineBtn.classList.contains("active_icon");
    let { rid, cid } = getRidCidfromAddress(addressBar.innerText);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    let cellObject = sheetDb[rid][cid];
    if (isActive) {
        underlineBtn.classList.remove("active_icon");
        cell.style.textDecoration = "none";
        cellObject.underline = false;
    } else {
        underlineBtn.classList.add("active_icon");
        cell.style.textDecoration = "underline";
        cellObject.underline = true;
    }
})

fontFamily.addEventListener("change", function (e) {
    let fontFam = fontFamily.value;
    let { rid, cid } = getRidCidfromAddress(addressBar.innerText);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    cell.style.fontFamily = fontFam;
    let cellObject = sheetDb[rid][cid];
    cellObject.fontFamily = fontFam;
})

fontSize.addEventListener("change", function (e) {
    let size = fontSize.value;
    let { rid, cid } = getRidCidfromAddress(addressBar.innerText);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    cell.style.fontSize = size + "px";
    let cellObject = sheetDb[rid][cid];
    cellObject.fontSize = size;
})

leftBtn.addEventListener("click", function () {
    let { rid, cid } = getRidCidfromAddress(addressBar.innerText);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    let cellObject = sheetDb[rid][cid];
    for (let i = 0; i < allAlignBtns.length; i++)
        allAlignBtns[i].classList.remove("active_icon")
    leftBtn.classList.add("active_icon");
    cell.style.textAlign = "left";
    cellObject.halign = "left";

})

centerBtn.addEventListener("click", function () {
    let { rid, cid } = getRidCidfromAddress(addressBar.innerText);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    let cellObject = sheetDb[rid][cid];
    for (let i = 0; i < allAlignBtns.length; i++)
        allAlignBtns[i].classList.remove("active_icon")
    centerBtn.classList.add("active_icon");
    cell.style.textAlign = "center";
    cellObject.halign = "center";

})

rightBtn.addEventListener("click", function () {
    let { rid, cid } = getRidCidfromAddress(addressBar.innerText);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    let cellObject = sheetDb[rid][cid];
    for (let i = 0; i < allAlignBtns.length; i++)
        allAlignBtns[i].classList.remove("active_icon")
    rightBtn.classList.add("active_icon");
    cell.style.textAlign = "right";
    cellObject.halign = "right";
})

textColorBtn.addEventListener("change", function(){
    let address = addressBar.innerText;
    let color = textColorBtn.value;
    let {rid, cid} = getRidCidfromAddress(address);
    let cellObject = sheetDb[rid][cid];
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    cell.style.color = color;
})

backgroundColorBtn.addEventListener("change", function(){
    let address = addressBar.innerText;
    let color = backgroundColorBtn.value;
    let {rid, cid} = getRidCidfromAddress(address);
    let cellObject = sheetDb[rid][cid];
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    cell.style.backgroundColor = color;
})

/* ********************* FORMULA CONTAINER********************************** */
// formula.js

/* ********************* GRID CONTAINER********************************** */
for (let i = 0; i < AllCells.length; i++) {
    AllCells[i].addEventListener("click", function (e) {
        let colAdd = Number(AllCells[i].getAttribute("cid"));
        let cid = String.fromCharCode(colAdd + 65);
        let rowAdd = Number(AllCells[i].getAttribute("rid"));
        let rid = rowAdd + 1;
        let address = cid + rid;
        addressBar.innerText = address;

        // restoring the cell properties
        let cellObject = sheetDb[rowAdd][colAdd];
        if (cellObject.bold == true) {
            boldBtn.classList.add("active_icon")
        } else {
            boldBtn.classList.remove("active_icon")
        }

        if (cellObject.italic == true) {
            italicBtn.classList.add("active_icon")
        } else {
            italicBtn.classList.remove("active_icon")
        }

        if (cellObject.underline == true) {
            underlineBtn.classList.add("active_icon")
        } else {
            underlineBtn.classList.remove("active_icon")
        }

        for (let i = 0; i < allAlignBtns.length; i++) {
            allAlignBtns[i].classList.remove("active_icon");
        }
        if (cellObject.halign == "left")
            leftBtn.classList.add("active_icon");
        else if (cellObject.halign == "center")
            centerBtn.classList.add("active_icon")
        else if (cellObject.halign == "right")
            rightBtn.classList.add("active_icon")

        if(cellObject.formula != "")
            formulaInput.innerText = cellObject.formula;
        else
            formulaInput.innerText = "";
       
    })

    AllCells[i].addEventListener("keydown", function(e){
        let obj = AllCells[i].getBoundingClientRect();
        let height = obj.height;
        let address = addressBar.innerText;
        let {rid} = getRidCidfromAddress(address);
        let leftCol = document.querySelectorAll(".leftColumn .left-col_box")[rid];
        leftCol.style.height = height + "px";
    })
}
AllCells[0].click();

/* ********************* SHEET CONTAINER********************************** */
add_btn.addEventListener("click", function (e) {
    let sheetArr = document.querySelectorAll(".sheet");
    let lastEle = sheetArr[sheetArr.length - 1];
    let idx = Number(lastEle.getAttribute("sheetIdx")) + 1;
    let NewSheet = document.createElement("div");
    NewSheet.setAttribute("class", "sheet");
    NewSheet.setAttribute("sheetIdx", idx);
    NewSheet.innerText = "Sheet " + idx;
    sheetList.appendChild(NewSheet);

    // making the new sheet active as soon as it is added
    for (let i = 0; i < sheetArr.length; i++)
        sheetArr[i].classList.remove("active_sheet");
    NewSheet.classList.add("active_sheet");

    initCurrentSheetDb();
    sheetDb = worksheetDb[idx - 1]
    initialUI();
    NewSheet.addEventListener("click", handleActiveSheet);
})

firstSheet.addEventListener("click", handleActiveSheet);

function handleActiveSheet(e) {
    let Mysheet = e.currentTarget;
    let sheetArr = document.querySelectorAll(".sheet");
    sheetArr.forEach(function (sheet) {
        sheet.classList.remove("active_sheet");
    })
    if (!Mysheet.classList[1]) {
        Mysheet.classList.add("active_sheet")
    }
    let idx = Mysheet.getAttribute("sheetIdx")
    sheetDb = worksheetDb[idx - 1];
    setUI(sheetDb);
}

// --------------HELPER FUNCTIONS ----------------------

function initialUI() {
    for (let i = 0; i < AllCells.length; i++) {
        AllCells[i].style.fontWeight = "normal";
        AllCells[i].style.fontStyle = "normal";
        AllCells[i].style.textDecoration = "none";
        AllCells[i].style.fontSize = "16px";
        AllCells[i].style.fontFamily = "Arial";
        AllCells[i].innerText = "";
    }
}

function setUI(sheetDb){
    for (let i = 0; i < sheetDb.length; i++){
        for (let j = 0; j < sheetDb[i].length; j++){
            let cell = document.querySelector(`.col[rid = "${i}"][cid = "${j}"]`);
            let {bold, italic, underline, fontFamily, fontSize, halign, value} = sheetDb[i][j];
            cell.style.fontWeight = bold == true ? "bold" : "normal";
            cell.style.fontStyle = italic == true ? "italic" : "normal";
            cell.style.textDecoration = underline == true ? "underline" : "none";
            cell.innerText = value;
        }
    }
} 