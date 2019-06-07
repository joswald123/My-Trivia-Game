$(document).ready(function () {
    var questions = [{
        "question": "Let's start with everyone's favorite character, Patrick Star. What is his dad's name?",
        "option 1": " Hector",
        "option 2": " Hart",
        "option 3": " Harry",
        "option 4": " Herb",
        "answer": "4",
        "urlImg": "./assets/images/answer0.gif"


    }, {
        "question": " In the theme song, Spongebob is described with three adjectives. What are they?",
        "option 1": " Polygonal, squishy, yellow",
        "option 2": " Absorbent, porous, yellow",
        "option 3": " Absorbent, polygonal, yellow",
        "option 4": " Porous, squishy, yellow",
        "answer": "2",
        "urlImg": "./assets/images/answer1.gif"

    }, {
        "question": "Tom Kenny is the voice of Spongebob. Which of these other characters does he NOT voice?",
        "option 1": " Patchy the Pirate",
        "option 2": " Plankton",
        "option 3": " The French Narrator",
        "option 4": " Gary the Snail",
        "answer": "2",
        "urlImg": "./assets/images/answer2.gif"
    }, {
        "question": "Who is Mermaid Man's faithful sidekick?",
        "option 1": " Barnacle Boy",
        "option 2": " Coral Kid",
        "option 3": " Sir Sand",
        "option 4": " Wavy Warrior",
        "answer": "1",
        "urlImg": "./assets/images/answer3.gif"
    }, {
        "question": "Before he was Spongebob, the character had a different name. What was it?",
        "option 1": " Spongeroo",
        "option 2": " Spongeman",
        "option 3": " Spongeboy",
        "option 4": " Spongelad",
        "answer": "3",
        "urlImg": "./assets/images/answer4.gif"

    }, {
        "question": "Which instrument does Squidward play?",
        "option 1": " Bassoon",
        "option 2": " Oboe",
        "option 3": " Saxophone",
        "option 4": " Clarinet",
        "answer": "4",
        "urlImg": "./assets/images/answer5.webp"
    }, {
        "question": "Sandy is not native to Bikini Bottom. Where is she from?",
        "option 1": " Arizona",
        "option 2": " Texas",
        "option 3": " Arkansas",
        "option 4": " Tennessee",
        "answer": "2",
        "urlImg": "./assets/images/answer6.webp"
    }, {
        "question": "What is the first line that Spongebob utters in the series?",
        "option 1": " I can’t wait Gary!",
        "option 2": " Today’s the big day, Gary!",
        "option 3": " Are you ready, Gary?",
        "option 4": " Let’s get going, Gary!",
        "answer": "2",
        "urlImg": "./assets/images/answer7.gif"
    }, {
        "question": "Where did Mr. Krabs go to school when he was a child?",
        "option 1": " Bikini Bottom Elementary",
        "option 2": " Neptune Elementary",
        "option 3": " Undersea Elementary",
        "option 4": " Poseidon Elementary",
        "answer": "4",
        "urlImg": "./assets/images/answer8.gif"
    }, {
        "question": "Before Mr. Krabs bought the Krusty Krab, it had a different name. What was it?",
        "option 1": " The Lusty Krab",
        "option 2": " The Busty Krab",
        "option 3": " The Musty Krab",
        "option 4": " The Rusty Krab",
        "answer": "4",
        "urlImg": "./assets/images/answer9.webp"

    }]

    var timer = 30;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var questionIndex = 0;
    var watch;

    var $startGame = $("#startTrivia");
    var $containerQuestion = $("#triviaGame");
    var $questionEl = $("#question");
    var $opt1 = $("#opt1");
    var $opt2 = $("#opt2");
    var $opt3 = $("#opt3");
    var $opt4 = $("#opt4");
    var $correct = $("#correct");
    var $incorrect = $("#incorrect");
    var $unanswered = $("#unanswered");
    var $timeDisplay = $('#timeRemaining');
    var $answertext = $('#textAnswer');
    var $answerImage = $("#answerImage");
    var $startAgain = $('#startOver')

    $('#triviaGame').hide();

    $startGame.on("click", function (event) {
        event.preventDefault();
        $('.containerStart').hide();
        $containerQuestion.show();
        loadQuestion();
        updatedTimer();
    })


    function loadQuestion() {
        if (questionIndex > 9) {
            $containerQuestion.hide()
            $('.container-result').show();
            // target the div win unaswerquestion and display
            $unanswered.html("Unanswered: " + unanswered)
            
        } else {

            var q = questions[questionIndex];
            $questionEl.html(q.question);
            $opt1.html(q["option 1"]);
            $opt2.html(q["option 2"]);
            $opt3.html(q["option 3"]);
            $opt4.html(q["option 4"]);

            timer = 30;
            updatedTimer()
            intervalid();
        }


    }

    function updatedTimer() {
        $timeDisplay.html("Time Remaining: " + timer)
    }

    function intervalid() {
        watch = setInterval(function () {
            timer--;
            if (timer <= 0) {
                clearInterval(watch);
                questionIndex++;
                unanswered++
                loadQuestion();
            }
            updatedTimer();
        }, 1000)
    }



    $('.option > input').on("click", function (event) {
        event.preventDefault();
        //check to see if correct answer was clicked
        const answer = $(this).val();
        const YouAreCorrect = answerCheck(answer)
        // toogle display from 2 to 3
        togglerOn(YouAreCorrect);
        // clear timer
        clearInterval(watch);
        timer = 30;

        setTimeout(function () {
            // toogle display 2 
            togglerOff();
            // run next question
            questionIndex++;
            loadQuestion();
        }, 3000)
    })

    function answerCheck(ans) {
        const correctAnswer = questions[questionIndex].answer;
        if (ans === correctAnswer) {
            correct++;
            $correct.html("Your correct answers are: " + correct)
            return true;

        } else {
            incorrect++;
            $incorrect.html("Your incorrect answers are: " + incorrect)
            return false;
        }

    }

    function togglerOn(YouAreCorrect) {
        // display a message telling user that he/she is correct or incorrect
        if (YouAreCorrect === true) {
            // display that they are correct
            $answertext.html("You're right! <br> <br> <p> The correct answer is: " + questions[questionIndex].answer + "</p>")
        }
        else {
            // display that they are not correct
            $answertext.html("Sorry, You didn't get it! <br> <br> <p> The correct answer is: " + questions[questionIndex].answer + "</p>")
        }
        console.log(questions[questionIndex].urlImg)
        $answerImage.attr("src", questions[questionIndex].urlImg)
        // create an image tag (using jquery) and insert image from answer0
        $('#triviaGame').hide();
        $('#answer').show();

    }
    function togglerOff() {
        $('#triviaGame').show();
        $('#answer').hide();
    }

    $('.container-result').hide();

    $startAgain.on("click", function (event) {
        event.preventDefault();
        
        $('#result').hide();
        $containerQuestion.show();
        questionIndex = 0; 
        timer = 30; 
        updatedTimer();
        loadQuestion();
    })




});