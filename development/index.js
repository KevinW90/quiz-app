// A bank of questions to ask
const STORE = [
  {
    question: "Where are you going?",
    answers: [
      'Nowhere',
      'Everywhere',
      'Somewhere',
      'Why do you need to know?'
    ],
    correctAnswer: 2
  },
  {
    question: "Why are we here?",
    answers: [
      'Because we need to be.',
      'Go home.',
      'To solve a problem',
      'To eat breakfast'
    ],
    correctAnswer: 0     
  },
  {
    question: "What are you doing",
    answers: [
      'Nothing',
      'Everything',
      'Something',
      'Why do you need to know?'
    ],
    correctAnswer: 3
  },
  {
    question: "What's for breakfast?",
    answers: [
      'Nothing',
      'Everything',
      'Something',
      'Why do you need to know?'
    ],
    correctAnswer: 1
  },
  {
    question: "What's for lunch?",
    answers: [
      'Nothing',
      'Everything',
      'Something',
      'Why do you need to know?'
    ],
    correctAnswer: 2
  }
];

//variables for quiz info
let score;
let curQ;
let totalQuestions;


const clickHandler = (e) => {
  e.preventDefault();
  let btnText = e.target.textContent.toLowerCase() || e.target.value.toLowerCase();
  console.log(btnText);
  switch(btnText){
    case 'start':
      startQuiz();
      break;
    case 'final answer':
      checkAnswer();
      break;
    case 'next':
      //update question count
      curQ++;
      console.log(curQ)
      //display next question
      displayQuestion();
      break;
    case 'retake':
      startQuiz();
      break;
    default:
      alert("That doesn't do anything");
  }
}

const displayQuestion = () => {
  //check for existing question
  if (curQ < totalQuestions) {
    //get current question details
    const questionText = STORE[curQ].question;
    const possibleAnswers = STORE[curQ].answers;

    //quiz details
    $('#currentQuestion').text(curQ + 1);
    $('#totalQuestions').text(totalQuestions);
    $('#score').text(score);

    //populate form fields
    $('#questionArea').text(questionText);
    possibleAnswers.forEach((el, ndx) => {
      $(`label[for=${ndx}]`).text(el);
    })

    //take off previous selection
    $('form > div').removeClass('selected correct incorrect');

    //change to 'final answer'
    $('input[type="submit"]').val('Final Answer');
  } else {
    console.log('hi')
    displayResults();
  }
}

const displayResults = () => {
  //hide quiz
  $('.question-display').hide();
  //show results page
  $('.results-page').show()
  //calculations
  let percentage = Math.round((score / totalQuestions) * 100, 2);
  $('#questionAmount').text(totalQuestions);
  $('#correctAnswers').text(score);
  $('#incorrectAnswers').text(totalQuestions - score);
  $('#percentage').text(percentage + '%');

  percentage > 70 ? $('#pass-fail').text('PASSED') : $('#pass-fail').text('FAILED')
}

const startQuiz = () => {
  //set quiz control variables
  score = 0;
  curQ = 0;
  totalQuestions = STORE.length;
  //display a question
  displayQuestion();
  //hide start page
  $('.start-page').hide();
  //show quiz
  $('.question-display').show();
}

const checkAnswer = () => {
  let userChoice = $($('input[name="choice"]:checked')[0]);
  console.log(userChoice);
  if (userChoice.val() == STORE[curQ].correctAnswer) {
    score++;
    $('#score').text(score);
    //highlight green
    userChoice.parent().addClass('correct');
  } else {
    //user choice red
    userChoice.parent().addClass('incorrect');
    //correct answer green
    $(`input[id=${STORE[curQ].correctAnswer}]`).parent().addClass('correct');
    console.log('wrong')
  }

  //change button text
  $('input[type="submit"]').val('Next');
}

$(document).ready(function(){
  //click listener for every button
  $('[class="btn"]').on('click', function(event){
    clickHandler(event);
  })

  //form div listener to check radio button
  $('form > div').on('click', function(event){
    //set all radio buttons to false
    $('input[type="radio"]').prop("checked", false);
    //find closest radio button, and check it
    $(this).find('input').prop("checked", true);
    //remove any selected classes
    $('form > div').removeClass('selected');
    //add white border to div
    $(this).addClass('selected');
  })

  //hide question display area
  $('.question-display').hide();
  //hide results page
  $('.results-page').hide();
})



//the page loads with the start screen
//to start the quiz, the user clicks the 'start quiz' button
  //get the first question object (text and answers)
  //print the question text and answers to the screen (overwrite existing form)
//check answer
  //get selected answer
  //compare selected answer with actual answer
    //increase score if correct
  //display correctness
//display results page