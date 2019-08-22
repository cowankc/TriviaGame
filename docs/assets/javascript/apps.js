$( document ).ready(function() {

    // variables and arrays 

    let time = 11;
    let correctCount = 0;
    let wrongCount = 0;
    let questionNumber = 0;
    let questionArray = [
    {
        question:"What year was Star Wars a New Hope released?",
        wrong1: " 1971 " ,
        wrong2: " 1980 ",
        answer: " 1977 ",
        wrong3: " 1975 ",
        image: "<img src='assets/images/starwars.gif'>",
    },
    {
        question: "What is the name of Luke's uncle?",
        wrong1: "Han",
        answer: "Owen",
        wrong2: "Ben",
        wrong3: "Yoda",
        image: "<img src='assets/images/owen.gif'>",
    },
    {
        question: "What is the name of the Planet where Luke finds Yoda",
        answer: "Dagobah",
        wrong2: "Tatooine",
        wrong1: "Hoth",
        wrong3: "Endor",
        image: "<img src='assets/images/dagobah.gif'>",
    },
    {
        question: "What color is Mace Windu's lightsaber",
        answer: "purple",
        wrong2: "green",
        wrong1: "red",
        wrong3: "blue",
        image: "<img src='assets/images/windu.gif'>",
    },
    {
        question: "Where is Chewbacca from?",
        wrong1: "Hoth",
        wrong2: "Wookieland",
        answer: "kashyyyk",
        wrong3: "Yavin IV",
        image: "<img src='assets/images/kashyyyk.gif'>",
    },
    {
        question:"How long does it take too be digested inside the sarlac pit?",
        wrong1: "20 seconds",
        wrong2: "4 days",
        wrong3: "10 years",
        answer: "1000 years",
        image: "<img src='assets/images/sarlacc.gif'>"
    },
    {
        question: "Who was in charge of the space battle during the Battle of Endor?",
        wrong1: "Han solo",
        answer: "Admiral Ackbar",
        wrong2: "Mon Mothma",
        wrong3: "Princess Leia",
        image: "<img src='assets/images/ackbar.gif'>"
    },
    {
        question: "what is the name of Han's son?",
        wrong1: " Luke ",
        wrong2: " Lando ",
        answer: " Ben ",
        wrong3: " Chewbacca ",
        image: "<img src='assets/images/ben.gif'>"
    },
    {
        question: "Who is Frozen in Carbonite and given to Jabba the Hut",
        wrong1: "luke Skywalker",
        wrong2: "Darth Vader",
        wrong3: "Princess Leia",
        answer: "Han Solo",
        image: "<img src='assets/images/frozen.jpg'>"
    },
    {
        question: "Who is Boba Fetts Father?",
        answer: "Jango",
        wrong2: "Greedo",
        wrong1: "Dex",
        wrong3: "Snoke",
        image: "<img src='assets/images/boba.gif'>"
    },
]


let start = function () {
    $("#start").on("click", function () {
        $("#start").remove();
        $("#pics").empty();
        $("#trivia").append().html(questionArray[questionNumber].question);
        answerShuffle();
        timeDisplay();
        Timeout();
        choice ();
    });
}

 let answerShuffle = function() {
    let answerArray = [questionArray[questionNumber].answer, questionArray[questionNumber].wrong1, questionArray[questionNumber].wrong2, questionArray[questionNumber].wrong3]
    let currentIndex = answerArray.length, temp, random;
    if (0 !== currentIndex) {
      random = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temp = answerArray[currentIndex];
      answerArray[currentIndex] = answerArray[random];
      answerArray[random] = temp;
    }
    return answerArray.forEach(element => {
    $("#answers").append("<div class='options'>" + element + "</div>")
    });
  }

let choice = function () {
    let correct = questionArray[questionNumber].answer;
    $("div.options:contains('"+correct+"')").on("click", function() {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        $("#answers").empty();
        $("#trivia").empty();
        $("#trivia").append("Correct!");
        $("#pics").prepend(questionArray[questionNumber].image);
        correctCount++;
        console.log(correctCount);
        questionNumber++
        timeTillQuestion ();
    });
    $("div.options:not(:contains('"+correct+"'))").on("click", function() {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        $("#answers").empty();
        $("#trivia").empty();
        $("#trivia").append("Wrong!")
        $("#pics").prepend("<img src='assets/images/wrong.gif'>");
        wrongCount++;
        console.log(wrongCount);
        questionNumber++
        timeTillQuestion ()
    });
    
}

// variables and functions for question timer 

let intervalId; 
let timeoutId;

let Timeout = function () {
    timeoutId = setTimeout(outOfTime, 11000)
}
let outOfTime = function (){
        console.log("yes")
        clearInterval(intervalId)
        $("#answers").empty();
        $("#trivia").empty();
        $("#trivia").append("OUT OF TIME")
        $("#pics").prepend("<img src='assets/images/wrong.gif'>");
        wrongCount++;
        questionNumber++
        timeTillQuestion ()
}

let timeDisplay = function () {
    intervalId = setInterval(countDown, 1000);
}

let countDown = function () {
    time--
    $("#timer").text(time)
}

let timeTillQuestion = function () {
    setTimeout(nextQuestion, 3000)
}

let nextQuestion = function() {
    if (questionNumber <= 9) {
    time = 15;
    $("#trivia").empty();
    $("#pics").empty();
    $("#timer").empty();
    $("#trivia").append().html(questionArray[questionNumber].question);
    answerShuffle();
    timeDisplay();
    Timeout();
    choice ();
    console.log(questionNumber);
    }
    else {
        $("#trivia").empty();
        $("#pics").empty();
        $("#timer").empty();
        $("#trivia").append("GAME OVER");
        $("#answers").append("Correct Answers: " + correctCount);
        $("#pics").append("Wrong Answers: " + wrongCount);
        let retry= $('<input type="button" value="retry" id="retry" class="offset-lg-5 col-lg-2 btn btn-success"/>');
        $("#buttons").append(retry);
        $("#retry").on("click", function() {
            time = 15;
            correctCount = 0;
            wrongCount = 0;
            questionNumber = 0;
            $("#retry").remove();
            $("#trivia").empty();
            $("#pics").empty();
            $("#timer").empty();
            $("#answers").empty();
            $("#trivia").append().html(questionArray[questionNumber].question);
            answerShuffle();
            timeDisplay();
            Timeout();
            choice ();
        });
    }
}

start()


});