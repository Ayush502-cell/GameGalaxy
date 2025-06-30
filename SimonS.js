let gameseq = [];
let userseq = [];

let gamestart = false;
let level = 0;
let h2 = document.querySelector('h2');
let btns = ['yellow','red','blue','green'];
let highscore = localStorage.getItem('simonHighScore') || 0;
document.getElementById('highscore').innerText = highscore;

document.addEventListener('keypress',function(e){
     if(gamestart==false){
        console.log("game is started");
        gamestart = true;

        levelup();
     }
});

function gameFlash(btn){
 btn.classList.add('flash');
 setTimeout(function(){
    btn.classList.remove('flash');
 },250);
}

function userFlash(btn){
 btn.classList.add('userflash');
 setTimeout(function(){
    btn.classList.remove('userflash');
 },250);
}

function levelup(){
   userseq = [];
   level++;
   h2.innerText = `Level ${level}`;

   let randIdx = Math.floor(Math.random() * 4);
   let randcolor = btns[randIdx];
   let randbt = document.querySelector('.' + randcolor);
   gameseq.push(randcolor);
   console.log(gameseq);
   gameFlash(randbt);
}

function checkans(idx){
   if(userseq[idx] === gameseq[idx]){
      if(userseq.length == gameseq.length){
         setTimeout(levelup,1000)
      }
   }else{
      if(level>highscore){
         highscore=level;
         localStorage.setItem('simonHighScore',highscore);
         document.getElementById('highscore').innerText = highscore;
      }
      h2.innerHTML =`Game over ! Your score is <b>${level}<b> <br>Press any key to start again.`;
      document.querySelector('body').style.backgroundColor='red';
      setTimeout(function(){
         document.querySelector('body').style.backgroundColor='rgb(207, 219, 80)';
      },150);
      reset();
   }
}

function buttonclicked(){
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkans(userseq.length-1);
}

let allbtns = document.querySelectorAll('.btn');
for(btn of allbtns){
    btn.addEventListener('click',buttonclicked);
}

function reset(){
   gamestart = false;
   gameseq=[];
   userseq=[];
   level = 0;
}