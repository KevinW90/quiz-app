// A bank of questions to ask
const STORE = [
  {
    question: "Where are you going?",
    answers: [
      'Nowhere',
      'Everywhere',
      'Somewhere',
      'why do you need to know?'
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
      'why do you need to know?'
    ],
    correctAnswer: 3
  },
  {
    question: "What's for breakfast?",
    answers: [
      'Nothing',
      'Everything',
      'Something',
      'why do you need to know?'
    ],
    correctAnswer: 1
  },
  {
    question: "What's for lunch?",
    answers: [
      'Nothing',
      'Everything',
      'Something',
      'why do you need to know?'
    ],
    correctAnswer: 2
  }
];

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