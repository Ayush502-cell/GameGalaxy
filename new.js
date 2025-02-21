let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset-button");
let message = document.querySelector("#msg");
let turnO= true;//let assume player O turn true
//Stored the winning pattern in 2d array
const winpatterns=[ 
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    boxes.forEach((box) => {
        box.innerText = ""; // Clear the text inside each box
        box.disabled = false; // Re-enable each box
    });
    msg.classList.add("hide"); // Hide the message
    msg.innerText = ""; // Clear the message text
    // Reset any other game state variables if necessary
};
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){ //player O turn
            box.innerText="X";
            turnO=false;
        }else{//player X turn
            box.innerText="O";
            turnO=true;
        }
        box.disabled=true;
        checkwinner();
    });
});

const disableBoxes =()=>{
    for(let box of boxes){
        box.disabled=true; 
    }
};

const enableBoxes =()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner = (winner)=>{
    msg.innerText = `Congratulations,winner is ${winner}`;
    msg.classList.remove("hide");
    disableBoxes();
};
const checkwinner = ()=>{
     for(let win of winpatterns){
        let pos1 =boxes[win[0]].innerText;
        let pos2 =boxes[win[1]].innerText;
        let pos3 =boxes[win[2]].innerText; 
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1===pos2 && pos2===pos3){
                console.log("Winner",pos1);
                showWinner(pos1);
            }
        }
     }
};

reset.addEventListener("click",resetGame);
