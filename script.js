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
      story: `The police first interviewed Mr. Silva at the reception. He said, "At 6:30 p.m., Professor Pires came to my desk. He said he was going to meet someone in the library at 8:00 p.m. He looked nervous, but he was trying to act calm. I was going to ask him more questions, but the phone on my desk rang, and I had to answer it."`,
      question: `What was Professor Pires going to do at 8:00 p.m.?`,
      coverImage: 'card_clue_1.png'
    },
    {
      id: 2,
      story: `Next, the police questioned Mr. Costa, a student near the language bookshelf. He said, "I was going to borrow a grammar book, but I saw Ms. Brito carrying a red envelope. She said, 'Good evening, Mr. Costa! Oh, this envelope? I'm going to leave it with the librarian, it's very important.'. She looked worried, like she was hiding something, but she did not say what."`,
      question: `What is Ms. Brito going to do with the red envelope?`,
      coverImage: 'card_clue_2.png'
    },
    {
      id: 3,
      story: `Then the police interviewed the librarian, Mrs. Vaz. She explained, "I was going to close the library early because of a small problem with the lights, but Professor Pires arrived and asked if he could use the heavy shelf in the back. He said, 'I'm going to organize some old papers.'. I told him to be careful, because the books were very heavy."`,
      question: `What was the librarian going to do?`,
      coverImage: 'card_clue_3.png'
    },
    {
      id: 4,
      story: `After that, the police spoke with Mrs. Martinelli, the janitor. She said, "I was going to mop the main corridor, but I saw two teachers arguing. The man said, 'I'm going to tell him tonight.' and the woman answered, 'You are not going to do that.'. They both walked away quickly. I didn't see where they went, but they looked very tense."`,
      question: `What is the woman going to do?`,
      coverImage: 'card_clue_4.png'
    },
    {
      id: 5,
      story: `The next interview was with Mr. Harb, the school nurse. He said, "I was going home, but I remembered I needed to return a key to the infirmary. Then, I heard footsteps in the corridor. Someone was talking about a folder and saying they were going to explain everything tomorrow. I didn't ask questions, because I didn't want to get involved."`,
      question: `What was Mr. Harb going to return?`,
      coverImage: 'card_clue_5.png'
    },
    {
      id: 6,
      story: `Later, the police questioned the security guard. He said, "I was going to lock the side gate at 7:30 p.m., but I noticed wet footprints near the garden. They seemed to come from the corridor. I also saw someone carrying a notebook and saying they were going to meet Professor Pires, but they turned around before I got close."`,
      question: `Where did the wet footprints lead?`,
      coverImage: 'card_clue_6.png'
    },
    {
      id: 7,
      story: `At the end of the night, the lead detective looked at all the notes again. 
              He said, "We were going to focus on the library only, but that was a mistake. 
              This investigation is going to start again from the beginning. 
              The first person we talked to was the receptionist, and Professor Pires said he was going to meet someone. 
              So we are going to go back to the reception and ask more questions. 
              Maybe the real story is going to appear there."`,
      question: `Where are the detectives going to go again?`,
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
