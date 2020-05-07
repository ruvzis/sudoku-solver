const boardSize = 9;


//CREATE BOXES ARRAY

 function makeBoxes(){
    let arr = [];
    let count = 0;
     for(let i = 0;i < boardSize ;i++){
        
        for(let j = 0;j < boardSize;j++){
            
          count++;
          let txtInput = document.getElementById(`box${count}`).innerText;
          if(txtInput ===''){
            let obj = {box:count, row:i+1, column:j+1, value: '',checkVal: 0}; 
            arr.push(obj); 
          } else {
            let obj = {box:count, row:i+1, column:j+1, value: `${txtInput}`,checkVal: parseInt(`${txtInput}`)}; 
            arr.push(obj);
          }
          
        }
     }
     return arr;
 }

let boxes = makeBoxes(); 

  

//POPULATE TABLE 
function populateTable(dataArr) {
    
    let cellCount = 0;
    
    for (var i = 0; i < boardSize; i++) {
      
      for (var j = 0; j < boardSize; j++) {           
          cellCount++;
          let cell = document.getElementById(`box${cellCount}`) 
          if(dataArr[cellCount-1].box === cellCount && dataArr[cellCount-1].value === ''){
             cell.innerText = '';
          } else{
             cell.innerText = `${dataArr[cellCount-1].value}`;
          } 
      }
    }
  }

//SOLVE


function solve(boxNumber){
    if (boxNumber > boardSize*boardSize ) {
        return true;
    }
    var checkBox = boxes[boxNumber-1];
    if(checkBox.value !== ''){
        var next = boxNumber + 1;
        return solve(next);
    }

    checkBox.checkVal++;
    while(checkBox.checkVal <= boardSize){
        var result = rowCheck(checkBox) && columnCheck(checkBox) && squareCheck(checkBox);
        if (result === true) {
            var next = boxNumber + 1;
            var innerResult = solve(next);
            if (innerResult === true) {
                return true;
            }
        }
        checkBox.checkVal++;
        if(checkBox.checkVal > boardSize){
            checkBox.checkVal = 0;
            return false;
        }
    }          
}

//RULES CHECK FUNCTIONS

function rowCheck(checkBox){
    let bol = true;   
    boxes.forEach((box)=>{
        if(box.row === checkBox.row){
            if (box.checkVal === checkBox.checkVal){
                if(box.box !== checkBox.box){
                    bol = false;
                    
                }
            }
       }}); 
       return bol;    
    };

function columnCheck(checkBox){
        let bol = true;
        boxes.forEach((box)=>{
            if(box.column === checkBox.column){
                if(box.checkVal === checkBox.checkVal){
                    if(box.box !== checkBox.box){
                        bol = false;
                    }
                }
            }
        });
        return bol;
    };

function squareCheck(checkBox){
    let bol = true;
    boxes.forEach((box)=>{
        if(box.row <= 3 && box.column <= 3 && checkBox.row <= 3 && checkBox.column <= 3){
            if(box.box !== checkBox.box){
                if(box.checkVal === checkBox.checkVal){
                    bol = false;
                }
            }
        } else if(box.row <= 3 && box.column > 3 && box.column <= 6 && checkBox.row <= 3 && checkBox.column > 3 && checkBox.column <= 6){
            if(box.box !== checkBox.box){
                if(box.checkVal === checkBox.checkVal){
                    bol = false;
                }
            }
        } else if(box.row <= 3 && box.column > 6 && checkBox.row <= 3 && checkBox.column > 6){
            if(box.box !== checkBox.box){
                if(box.checkVal === checkBox.checkVal){
                    bol = false;
                }
            }
        } else if(box.row > 3 && box.row <= 6 && box.column <= 3 && checkBox.row > 3 && checkBox.row <=6 && checkBox.column <= 3){
            if(box.box !== checkBox.box){
                if(box.checkVal === checkBox.checkVal){
                    bol = false;
                }
            }
        } else if(box.row > 3 && box.row <= 6 && box.column > 3 && box.column <= 6 && checkBox.row > 3 && checkBox.row <=6 && checkBox.column > 3 && checkBox.column <= 6){
            if(box.box !== checkBox.box){
                if(box.checkVal === checkBox.checkVal){
                    bol = false;
                }
            }
        } else if(box.row > 3 && box.row <= 6 && box.column > 6 && checkBox.row > 3 && checkBox.row <=6 && checkBox.column > 6){
            if(box.box !== checkBox.box){
                if(box.checkVal === checkBox.checkVal){
                    bol = false;
                }
            }
        } else if(box.row > 6 && box.column <= 3 && checkBox.row > 6 && checkBox.column <= 3){
            if(box.box !== checkBox.box){
                if(box.checkVal === checkBox.checkVal){
                    bol = false;
                }
            }
        } else if(box.row > 6 && box.column > 3 && box.column <= 6 && checkBox.row > 6 && checkBox.column > 3 && checkBox.column <= 6){
            if(box.box !== checkBox.box){
                if(box.checkVal === checkBox.checkVal){
                    bol = false;
                }
            }
        } else if(box.row > 6 && box.column > 6 && checkBox.row > 6 && checkBox.column > 6){
            if(box.box !== checkBox.box){
                if(box.checkVal === checkBox.checkVal){
                    bol = false;
                }
            }
        }   
         
    });
      return bol;
    };


populateTable(boxes);

//Solve button
document.getElementById('solve-btn').onclick = function (){
    solve(1);
    for(let i =0; i<boxes.length;i++){
    boxes[i].value = boxes[i].checkVal.toString();
    }
    populateTable(boxes);
}