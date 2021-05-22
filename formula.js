let addressBar = document.querySelector(".address_bar");
let formulaInput = document.querySelector(".formula_bar");
let AllCells = document.querySelectorAll(".grid .col");


for (let i = 0; i < AllCells.length; i++) {
    AllCells[i].addEventListener("blur", function () {
        let { rid, cid } = getRidCidfromAddress(addressBar.value);
        let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
        let cellObject = sheetDb[rid][cid];

        if (cellObject.value == cell.innerText) {  
            return;
        }

        if(cellObject.formula)
            removeFormula(cellObject, addressBar.value);
        
        cellObject.value = cell.innerText;
        changeChildren(cellObject);
    })
}

formulaInput.addEventListener("keydown", function(e){
    if(e.key == "Enter" && formulaInput.value != ""){
        let Newformula = formulaInput.value;
        let {rid , cid} = getRidCidfromAddress(addressBar.value);
        let cellObject = sheetDb[rid][cid]
        let prevformula = cellObject.formula;

        if(prevformula == Newformula)
            return;
        
        if(prevformula != "" && prevformula != Newformula){
            removeFormula(cellObject, addressBar.value);
        }
        let evaluatedValue = evaluateFormula(Newformula);
        setUIbyFormula(rid, cid, evaluatedValue);
        setDBbyFormula(evaluatedValue, Newformula, rid, cid, addressBar.value);
        changeChildren(cellObject);
    }

})

function evaluateFormula(formula){
    // ( A1 + A2 )
    let formulaArr = formula.split(" "); //["(", "A1", "+", "A2", ")"]
    for(let i = 0; i < formulaArr.length; i++){
        let firstElement = formulaArr[i].charCodeAt(0);
        if(firstElement >= 65 && firstElement <= 90){
            let {rid, cid} = getRidCidfromAddress(formulaArr[i]);
            let cellObj = sheetDb[rid][cid];
            formula = formula.replace(formulaArr[i], cellObj.value);
        }
    }
    let ans = eval(formula);
    return ans;
}

function setUIbyFormula(rid, cid, value){
    document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`).innerText = value;
}

function setDBbyFormula(value, formula, rid, cid, address){
    let cellObj = sheetDb[rid][cid];
    cellObj.value = value;
    cellObj.formula = formula;

    let formulaArr = formula.split(" "); 
    for(let i = 0; i < formulaArr.length; i++){
        let firstElement = formulaArr[i].charCodeAt(0);
        if(firstElement >= 65 && firstElement <= 90){
            let parentRidCid = getRidCidfromAddress(formulaArr[i]);
            let parentObj = sheetDb[parentRidCid.rid][parentRidCid.cid];
            parentObj.children.push(address);
        }
    }

}

function changeChildren(cellObject){
    let childrenArr = cellObject.children;
    for(let i = 0; i < childrenArr.length; i++){
        let childID = getRidCidfromAddress(childrenArr[i]);
        let childCellObj = sheetDb[childID.rid][childID.cid];
        let newAns = evaluateFormula(childCellObj.formula);
        setUIbyFormula(childID.rid, childID.cid, newAns);
        childCellObj.value = newAns;
        changeChildren(childCellObj);
    }
}

function removeFormula(cellObject, address){ 
    let formula = cellObject.formula;
    let formulaArr = formula.split(" "); 
    for(let i = 0; i < formulaArr.length; i++){
        let firstElement = formulaArr[i].charCodeAt(0);
        if(firstElement >= 65 && firstElement <= 90){
            let parentRidCid = getRidCidfromAddress(formulaArr[i]);
            let parentObj = sheetDb[parentRidCid.rid][parentRidCid.cid];
            let children = parentObj.children;
            let idx = children.indexOf(address);
            children.splice(idx, 1);

        }
    }
    cellObject.formula = "";
}

// getting address from address bar
function getRidCidfromAddress(address) {
    let colAdd = address.charCodeAt(0);
    let rowAdd = Number(address.slice(1));
    let rid = rowAdd - 1;
    let cid = colAdd - 65;
    return { rid, cid }
}