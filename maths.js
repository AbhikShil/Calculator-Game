var playing = false;
var score = 0;
var timeremaining;
var action;
var correctAnswer;
document.getElementById("startorreset").onclick = function () {
    if(playing == true){
        location.reload();
    }
    else{
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        document.getElementById("startorreset").innerHTML = "Reset Game";
        show("timer");
        hide("gameover")
        timeremaining=60;
        document.getElementById("timervalue").innerHTML=timeremaining;
        countDown();
        generateQA();
    }
}
function show(id){
    document.getElementById(id).style.display="block";
}
function hide(id){
    document.getElementById(id).style.display="none";
}
function countDown(){
    action=setInterval(function(){
        timeremaining-=1;
        document.getElementById("timervalue").innerHTML=timeremaining;
        if(timeremaining==0){
            clearInterval(action);
            document.getElementById("gameover").innerHTML="<p>Game Over!</p><p>Your Score Is : "+score+"</p>";
            show("gameover");
            hide("correct");
            hide("wrong");
            hide("timer");
            playing=false;
            document.getElementById("startorreset").innerHTML="Start Game";
        }
    },1000);
    
}
function generateQA(){
    var x=1+Math.round(9*Math.random());
    var y=1+Math.round(9*Math.random());
    correctAnswer=x*y;
    document.getElementById("question").innerHTML=x+"x"+y;
    var answers=[correctAnswer];
    var correctPosition=1+Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML=correctAnswer;
    for(i=1;i<5;i++){
        if(i!=correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer=(1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
            }while(answers.indexOf(wrongAnswer)>-1);
            document.getElementById("box"+i).innerHTML=wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}
for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick=function(){
        if(playing==true){
            if(this.innerHTML== correctAnswer){
                score++;
                document.getElementById("scorevalue").innerHTML=score;
                hide("wrong");
                show("correct");
                setTimeout(function(){hide("correct")},1000);
                generateQA();
            }
            else{
                hide("correct");
                show("wrong");
                setTimeout(function(){hide("wrong")},1000);
            }
        }
    }
}