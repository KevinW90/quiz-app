// A bank of questions to ask
const STORE = [
  {
    question: "What are you doing?",
    answers: [
      'Nothing',
      'Everything',
      'Something',
      'Why do you need to know?'
    ],
    correctAnswer: 3
  },
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
  },
  {
    question: "What's for dinner?",
    answers: [
      'Nothing',
      'Everything',
      'Something',
      'Why do you need to know?'
    ],
    correctAnswer: 0
  },
];

//variables for quiz info
let score;
let curQ;
let totalQuestions;


const clickHandler = (e) => {
  e.preventDefault();
  //convert target to jq object
  const $target = $(e.target);
  let btnText = $target.text().toLowerCase() || $target.val().toLowerCase();
  //switch is a condensed if
  switch(btnText){
    //start and retake do the same thing
    case 'start': //if (btnText === 'start')
    case 'retake': //if (btnText === 'retake')
      startQuiz();
      break; //means else
    case 'final answer': //else if (btnText === 'final answer')
      checkAnswer();
      break; //means else
    case 'next': //else if (btnText === 'next')
      //update question count
      curQ++;
      //display next question
      displayQuestion();
      break; //means else
    case 'home': //else if (btnText === 'home')
      //hide results page
      $('.results-page').hide();
      //show start page
      $('.start-page').show();
      break; //means else
    default: //else
      alert("That doesn't do anything");
      //no break; (else) because no more tests
  }
}

const displayQuestion = () => {
  //check for existing question
  if (curQ < totalQuestions) { //more questions
    //get current question details
    const questionText = STORE[curQ].question;
    const choices = STORE[curQ].answers;

    //quiz details
    $('#currentQuestion').text(curQ + 1);
    $('#totalQuestions').text(totalQuestions);
    $('#score').text(score);

    //populate form fields
    $('#question-area').text(questionText);
    /*
    for (let i = 0; i < choices.length; i++) {
      $(`label[for=${i}]`).text(choices[i]);
    }
    */
    choices.forEach((el, ndx) => {
      //change label text (for attribute)
      $(`label[for=${ndx}]`).text(el);
    });

    //take off previous selection
    $('[type="radio"]').prop('checked', false);
    $('form > div').removeClass('selected correct incorrect');

    //change submit button text to 'final answer'
    $('input[type="submit"]').val('Final Answer');
  } else { //no more questions
    displayResults();
  }
}

const displayResults = () => {
  //hide quiz
  $('.question-page').hide();
  //show results page
  $('.results-page').show()
  //calculations
  let percentage = Math.round((score / totalQuestions) * 100, 2);
  $('#questionAmount').text(totalQuestions);
  $('#correctAnswers').text(score);
  $('#incorrectAnswers').text(totalQuestions - score);
  $('#percentage').text(percentage + '%');

  //pass or fail text based on percentage greater than or equal to 70%
  // percentage >= 70 ? $('#pass-fail').text('PASSED') : $('#pass-fail').text('FAILED');
  $('#pass-fail').text(percentage >= 70 ? 'passed' : 'failed');
}

const startQuiz = () => {
  //set quiz control variables
  score = 0;
  curQ = 0;
  totalQuestions = STORE.length;
  //display a question
  displayQuestion();
  //hide start, results page
  $('.start-page, .results-page').hide();
  //show quiz
  $('.question-page').show();

  //create quiz progress bubbles
  $('.quiz-info').empty();
  STORE.forEach( (q, ndx) => {
    $('.quiz-info').append(`<div class="bubble${ndx} bubble"></div>`);
  })
}

const checkAnswer = () => {
  //double $() wrapper to convert to jq object
  let userChoice = $($('input[name="choice"]:checked')[0]);
  if (Number(userChoice.val()) === STORE[curQ].correctAnswer) {
    score++;
    $('#score').text(score);
    //highlight green
    userChoice.parent().addClass('correct');
    //bubble green
    $(`.bubble${curQ}`).addClass('correct');
  } else {
    //user choice red
    userChoice.parent().addClass('incorrect');
    //correct answer green
    $(`[id=${STORE[curQ].correctAnswer}]`).parent().addClass('correct');
    //bubble red
    $(`.bubble${curQ}`).addClass('incorrect');
  }

  //change button text
  $('[type="submit"]').val('Next');
}

$(document).ready(function(){
  //set height of .brain
  const headerH = $('.header').outerHeight();
  const startH = $('.quiz-start').outerHeight();
  const subH = headerH + startH;
  $('.brain').height($('body').height() - subH);

  //set height of quiz-info (bubbles area)
  const formH = $('form').outerHeight();
  $('.quiz-info').height($('body').height() - formH - subH - 20);
  
  //click listener for every button
  $('[class="btn"]').on('click', function(event){
    clickHandler(event);
  })

  //form div listener to check radio button
  $('form > div').on('click', function(event){
    //set all radio buttons to false
    $('[type="radio"]').prop('checked', false);
    //find closest radio button, and check it
    $(this).find('[type="radio"]').prop('checked', true);
    //remove any selected classes
    $('form > div').removeClass('selected');
    //add white border to selected answer
    $(this).addClass('selected');
  })

  //hide question display area
  $('.question-page').hide();
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

/*
the page loads with the start screen
  add event listeners at this point so they are only created one time per element
    ('.btn', user choice) listeners
      '[class="btn"]', 'form div'
  hide all sections except for start page
    (questions, results) pages
      '.question-page', '.results-page'
start quiz button is clicked
  set quiz related info to initial values
    (curQ, score, totalQuestions)
display questions
  hide start page
  get question info
    (STORE)
a choice is selected
  check the radio button that goes with that choice
    'form div' > find input element
answer is submitted
  '.btn' click
check answer
  get user choice
    ':checked'
  get correct answer
    STORE[].correctAnswer
correctness of answer
  highlight correct with green
  highlight wrong with red
***loop until out of questions (current question < total questions)***
display results page
  '.results-page'
  hide question page
    '.question-page'
  retake quiz
    '.btn' click
    restart quiz (see *start quiz buttn is clicked*)
*/