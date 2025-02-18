
let playerRole = document.querySelector(".statu");

let turn = 'x';

let board = document.querySelector(".board");

let cellArr =[];

// الحصول على عناصر النقاط لكل لاعب
let xScoreElement = document.querySelector(".points"); // X
let oScoreElement = document.querySelector(".opoints"); // O
// Convert String to int 
let xScore = parseInt(xScoreElement.textContent); // tirm ->  html تحذف المسافات داخل عنصر 
let oScore = parseInt(oScoreElement.textContent);

function showwiner(num1, num2, num3, winner){

    document.getElementById('item' + num1).style.background ="#1239";
    document.getElementById('item' + num2).style.background ="#1239";
    document.getElementById('item' + num3).style.background ="#1239";

    if(winner === 'X'){
        xScore++;
        xScoreElement.textContent = xScore;
        
    }else if(winner === 'O'){
        oScore++;
        oScoreElement.textContent = oScore;        
    }
    setTimeout(() => {
        
        gameOver();
    }, 2000);
    
}

function winner(){
    for (let i =1; i < 10; i++){
        cellArr[i] = document.getElementById('item' + i) .innerHTML;
    }

    let winCondation = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],  // Coulmn
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Row
        [1, 5, 9], [3, 5, 7]         // Diameters أقطار
    ];

// Loop through all possible winning conditions
    for (let condation of winCondation){    
        // Destructure the array to get the three positions of a winning line
        let [a, b, c] = condation;
        // Check if the three positions contain the same non-empty value (X or O)
        if(cellArr[a] === cellArr[b] && cellArr[a] === cellArr[c] && cellArr[a] !== ''){

            // Call the function to highlight the winner and update the game status
            showwiner(a, b, c, cellArr[a]);
            
            setTimeout(() => {
                again();
            }, 1000);

            return; // stop check
        }
    }
};

board.addEventListener("click", (event) => {
    // الخاص بالعنصر الذي تم النقره عليه وخونه في متغير  id عند النقر استهدف 
    let cellId = event.target.id;

    let element = document.getElementById(cellId);
    if (turn === 'x' && element.innerHTML === ''){
        element.innerHTML = 'X';
        element.classList.add("x"); // إضافة كلاس 'x' للعنصر
        
        // switch X to O
        turn = 'o';
        playerRole.innerHTML = 'O';
    }
    else if(turn === 'o' && element.innerHTML === ''){
        element.innerHTML = 'O';
        element.classList.add("o"); // إضافة كلاس 'x' للعنصر

        // Switch O to X
        turn = 'x';
        playerRole.innerHTML = 'X';
    }   

    game(cellId);

    winner();
});


let newGame = document.querySelector(".reset-button");
newGame.addEventListener("click", ()=>{
    again();
});

function again() {
    for (let i = 1; i <10; i++) {
        let cell = document.getElementById('item' + i);
        cell.innerHTML = ''; // حذف محتوى الخلية
        cell.style.background = ''; // إعادة تعيين الخلفية
        cell.classList.remove("x", "o"); // حذف الكلاسات
    }
    
    turn = 'o'; // إعادة الدور إلى X
    playerRole.innerHTML = 'O';
}

function gameOver(){
    if (xScore ==3 ) {
        alert(`Game Over `);
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
    else if(oScore ==3){
        alert(`Game Over`);
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}



function game(cellId) {
    console.log(`تم النقر على العنصر: ${cellId}`);
}

