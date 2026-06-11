document.addEventListener('DOMContentLoaded', () => {
  const flipCard     = document.getElementById('flip-card');
  const cardFront    = document.querySelector('.card-front');
  const clueStory    = document.getElementById('clue-story');
  const clueQuestion = document.getElementById('clue-question');
  const answerInput  = document.getElementById('answer-input');
  const submitBtn    = document.getElementById('submit-answer');
  const messageArea  = document.getElementById('message-area');

  // Senha do professor (troque aqui)
  const TEACHER_PASSWORD = 'unlockclue';

  const allClues = [
    {
      id: 1,
      story: 'At 7:00 p.m., Ms. Rodrigues was sitting on the reception. She was waiting for someone, but she looked very nervous. She was tapping her foot and checking her watch. There were two other students there, but they were listening to music and didn’t notice her. Ms. Rodrigues thought, “Maybe I should talk to the secretary about the book I wanted to borrow,” and then she stood up.',
      question: 'According to the story, what did Ms. Rodrigues think she should do?',
      coverImage: 'card_clue_1.png'
    },
    {
      id: 2,
      story: 'At 7:10 p.m., Ms. Rodrigues arrived at the secretary desk. She said, “I would like to borrow a book from the language shelf.” The secretary answered, “You can borrow a book, but you should be careful. Some books are very old and very heavy.” Ms. Rodrigues smiled and said, “Don’t worry, I will be careful,” and then she walked away.',
      question: 'What does the secretary say Ms. Rodrigues should be?',
      coverImage: 'card_clue_2.png'
    },
    {
      id: 3,
      story: 'At the language bookshelf, there were many books in different languages. Some books were small, but some were very big and heavy. Ms. Rodrigues chose one of the heaviest books, called “Great Crimes of the World”. She thought, “Maybe I shouldn’t carry this book alone, but I don’t have time to ask for help.” She took the book anyway and started walking to the main corridor.',
      question: 'What do you think Ms. Rodrigues shouldn’t do in this situation?',
      coverImage: 'card_clue_3.png'
    },
    {
      id: 4,
      story: 'At 7:20 p.m., Ms. Rodrigues was walking slowly along the main corridor, still carrying the heavy book. A student later said, “Ms. Rodrigues looked very worried. A few minutes later, I saw Mr. Bertolaccini. He was walking very fast towards the small garden. He wasn’t wearing his glasses, I think. He should probably wear his glasses at night, because the corridor is dark.”',
      question: 'What does the student think Mr. Bertolaccini should do at night?',
      coverImage: 'card_clue_4.png'
    },
    {
      id: 5,
      story: 'At 7:25 p.m., a student was looking at the plants in the small garden. Suddenly, they heard a loud noise from the corridor. It sounded like a heavy object falling on the floor. The student thought, “I should go and check, but I am scared.” They stayed in the garden and only watched. They saw a shadow moving quickly towards the bathrooms.',
      question: 'What did the student think they should do after hearing the loud noise?',
      coverImage: 'card_clue_5.png'
    },
    {
      id: 6,
      story: 'At around 7:27 p.m., another student was in the bathroom. They heard someone running in the corridor. They couldn’t see the person clearly, but they saw a shadow go into the lavabo. A few minutes later, Mr. Bertolaccini came out of the lavabo. He looked pale and had a small cut on his right hand. He said, “I need to find my glasses.” The student later told the police, “They should check the lavabo carefully.”',
      question: 'What does the student say the police should do?',
      coverImage: 'card_clue_6.png'
    },
    {
      id: 7,
      story: 'At 8:00 p.m., the police arrived at the school. They first went to the reception area and talked to the students there. One student said, “You should start the investigation here, because Ms. Rodrigues was sitting on these sofas before everything happened.” Later, the police searched the rest of the school and found something in the lavabo: a pair of broken glasses and a small drop of blood.',
      question: 'According to the student, where should the police start the investigation?',
      coverImage: 'card_clue_7.png'
    }
  ];

  function getClueIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('clueId'), 10);
  }

  let clueId = getClueIdFromUrl();
  if (!clueId || Number.isNaN(clueId)) clueId = 1;

  const currentClueData = allClues.find(clue => clue.id === clueId);

  if (!currentClueData) {
    // fallback forte: se der algo estranho, mostra a 1
    clueStory.textContent    = 'Clue not found. Showing Clue 1.';
    clueQuestion.textContent = '';
  } else {
    clueStory.textContent    = currentClueData.story;
    clueQuestion.textContent = currentClueData.question;

    cardFront.style.backgroundImage    = `url("${currentClueData.coverImage}")`;
    cardFront.style.backgroundPosition = 'center';
    cardFront.style.backgroundSize     = 'cover';
    cardFront.style.backgroundRepeat   = 'no-repeat';
  }

  // Virar card ao clicar
  flipCard.addEventListener('click', () => {
    if (!flipCard.classList.contains('flipped') &&
        !messageArea.classList.contains('success')) {
      flipCard.classList.add('flipped');
      answerInput.focus();
    }
  });

  // Submit do aluno → painel professor
  submitBtn.addEventListener('click', () => {
    const studentAnswer = answerInput.value.trim();

    if (!studentAnswer) {
      messageArea.className = 'message-area error';
      messageArea.textContent = 'Please write your answer before submitting.';
      return;
    }

    answerInput.disabled = true;
    submitBtn.disabled   = true;

    messageArea.className = 'message-area';
    messageArea.innerHTML = `
      <div class="teacher-panel">
        <p class="teacher-label">DETECTIVE'S ANSWER:</p>
        <p class="student-answer-display">"${studentAnswer}"</p>
        <input
          type="password"
          id="password-input"
          placeholder="Teacher password"
          autocomplete="off"
        />
        <div class="teacher-buttons">
          <button id="confirm-btn">✓ Confirm</button>
          <button id="cancel-btn">✗ Cancel</button>
        </div>
        <p id="password-error" class="password-error"></p>
      </div>
    `;

    const passwordInput = document.getElementById('password-input');
    const confirmBtn    = document.getElementById('confirm-btn');
    const cancelBtn     = document.getElementById('cancel-btn');
    const passwordError = document.getElementById('password-error');

    passwordInput.focus();

    function confirmWithPassword() {
      if (passwordInput.value === TEACHER_PASSWORD) {
        messageArea.className = 'message-area success';
        messageArea.textContent =
          "You're one step closer to solving this murder mystery. Your teacher will give you the next clue.";

        answerInput.disabled  = true;
        submitBtn.disabled    = true;
        flipCard.style.cursor = 'default';
      } else {
        passwordError.textContent = 'Incorrect password. Try again.';
        passwordInput.value = '';
        passwordInput.focus();
      }
    }

    confirmBtn.addEventListener('click', confirmWithPassword);
    passwordInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') confirmWithPassword();
    });

    cancelBtn.addEventListener('click', () => {
      messageArea.className = 'message-area';
      messageArea.textContent = '';
      answerInput.disabled = false;
      submitBtn.disabled   = false;
      answerInput.focus();
    });
  });

  answerInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') submitBtn.click();
  });
});
