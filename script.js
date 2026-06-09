document.addEventListener('DOMContentLoaded', () => {
  const flipCard = document.getElementById('flip-card');
  const cardFront = document.querySelector('.card-front'); // Seleciona a frente do card
  const clueStory = document.getElementById('clue-story');
  const clueQuestion = document.getElementById('clue-question');
  const answerInput = document.getElementById('answer-input');
  const submitBtn = document.getElementById('submit-answer');
  const messageArea = document.getElementById('message-area');

  // --- TODAS AS PISTAS DO JOGO ---
  // Adicione um campo 'coverImage' para cada pista
  const allClues = [
  {
    id: 1,
    story: 'At 7:00 p.m., Mr. Brown was sitting on the reception sofas. He was waiting for someone, but he looked very nervous. He was tapping his foot and checking his watch. There were two other students there, but they were listening to music and didn’t notice him. Mr. Brown thought, “Maybe I should talk to the secretary about the book now,” and then he stood up.',
    question: 'According to the story, what did Mr. Brown think he should do?',
    acceptableAnswers: [
      'he should talk to the secretary',
      'he should talk to the secretary.',
      'mr brown should talk to the secretary',
      'mr brown should talk to the secretary.'
    ],
    coverImage: 'Cartoes__Cena_de_crime.png'
  },
  {
    id: 2,
    story: 'At 7:10 p.m., Mr. Brown arrived at the secretary desk. He said, “I would like to borrow a book from the language shelf.” The secretary answered, “You can borrow a book, but you should be careful. Some books are very old and very heavy.” Mr. Brown smiled and said, “Don’t worry, I will be careful,” and then he walked away.',
    question: 'What does the secretary say Mr. Brown should be?',
    acceptableAnswers: [
      'he should be careful',
      'he should be careful.',
      'mr brown should be careful',
      'mr brown should be careful.'
    ],
    coverImage: 'Cartao_Pista2.png'
  },
  {
    id: 3,
    story: 'At the language shelf, there were many books in different languages. Some books were small, but some were very big and heavy. Mr. Brown chose one of the heaviest books, called “Great Crimes of the World”. He thought, “Maybe I shouldn’t carry this book alone, but I don’t have time to ask for help.” He took the book anyway and started walking to the main corridor.',
    question: 'What do you think Mr. Brown shouldn’t do in this situation?',
    acceptableAnswers: [
      "he shouldn't carry that heavy book alone",
      "he shouldn't carry that heavy book alone.",
      "mr brown shouldn't carry that heavy book alone",
      "mr brown shouldn't carry that heavy book alone."
    ],
    coverImage: 'Cartao_Pista3.png'
  },
  {
    id: 4,
    story: 'At 7:20 p.m., Mr. Brown was walking slowly along the main corridor, still carrying the heavy book. A student later said, “Mr. Brown looked very worried. A few minutes later, I saw Ms. White. She was walking very fast towards the small garden. She wasn’t wearing her glasses, I think. She should probably wear her glasses at night, because the corridor is dark.”',
    question: 'What does the student think Ms. White should do at night?',
    acceptableAnswers: [
      'she should wear her glasses',
      'she should wear her glasses.',
      'ms white should wear her glasses',
      'ms white should wear her glasses.'
    ],
    coverImage: 'Cartao_Pista4.png'
  },
  {
    id: 5,
    story: 'At 7:25 p.m., a student was looking at the plants in the small garden. Suddenly, they heard a loud noise from the corridor. It sounded like a heavy object falling on the floor. The student thought, “I should go and check, but I am scared.” They stayed in the garden and only watched. They saw a shadow moving quickly towards the bathrooms.',
    question: 'What did the student think they should do after hearing the loud noise?',
    acceptableAnswers: [
      'they should go and check',
      'they should go and check.',
      'i should go and check',
      'i should go and check.'
    ],
    coverImage: 'Cartao_Pista5.png'
  },
  {
    id: 6,
    story: 'At around 7:27 p.m., another student was washing their hands in the bathroom. They heard someone running in the corridor. They couldn’t see the person clearly, but they saw a shadow go into the lavabo. A few minutes later, Ms. White came out of the lavabo. She looked pale and had a small cut on her right hand. She said, “I need to find my glasses.” The student later told the police, “They should check the lavabo carefully.”',
    question: 'What does the student say the police should do?',
    acceptableAnswers: [
      'they should check the lavabo carefully',
      'they should check the lavabo carefully.'
    ],
    coverImage: 'Cartao_Pista6.png'
  },
  {
    id: 7,
    story: 'At 8:00 p.m., the police arrived at the school. They first went to the reception area and talked to the students there. One student said, “You should start the investigation here, because Mr. Brown was sitting on these sofas before everything happened.” Later, the police searched the rest of the school and found something in the lavabo: a pair of broken glasses and a small drop of blood. Meanwhile, in the corridor near the language shelf, they discovered Mr. Brown’s body with a head injury and the heavy book on the floor.',
    question: 'According to the student, where should the police start the investigation?',
    acceptableAnswers: [
      'they should start the investigation in the reception',
      'they should start the investigation in the reception.',
      'they should start the investigation at the reception',
      'they should start the investigation at the reception.'
    ],
    coverImage: 'Cartao_Pista7.png'
  }
];
  // --- Fim de TODAS AS PISTAS ---

  let currentClueData = null;

  function getClueIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('clueId'), 10);
  }

  const clueId = getClueIdFromUrl();
  if (clueId) {
    currentClueData = allClues.find(clue => clue.id === clueId);
    if (currentClueData) {
      clueStory.textContent = currentClueData.story;
      clueQuestion.textContent = currentClueData.question;

      // --- AQUI É ONDE VOCÊ COLOCA AS LINHAS DA IMAGEM ---
      cardFront.style.backgroundImage = `url("${currentClueData.coverImage}")`;
      cardFront.style.backgroundPosition = 'center';
      cardFront.style.backgroundSize = 'cover';
      cardFront.style.backgroundRepeat = 'no-repeat';
      // --- FIM DAS LINHAS DA IMAGEM ---

    } else {
      clueStory.textContent = "No clue found. Check the link (example: ?clueId=1).";
      clueQuestion.textContent = "";
      answerInput.disabled = true;
      submitBtn.disabled = true;
    }
  } else {
    clueStory.textContent = "No clue ID provided in the URL. Please use a link like index.html?clueId=1";
    clueQuestion.textContent = "";
    answerInput.disabled = true;
    submitBtn.disabled = true;
  }

  // virar card ao clicar
  flipCard.addEventListener('click', () => {
    if (!flipCard.classList.contains('flipped') &&
      !messageArea.classList.contains('success')) {
      flipCard.classList.add('flipped');
      answerInput.focus();
    }
  });

  submitBtn.addEventListener('click', checkAnswer);
  answerInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkAnswer();
  });

  function normalizeAnswer(text) {
    let normalized = text.trim().toLowerCase();

    if (normalized.endsWith('.')) {
      normalized = normalized.slice(0, -1);
    }

    normalized = normalized.replace(/\s+/g, ' ');

    return normalized;
  }

  function checkAnswer() {
    if (!currentClueData) return;

    const userRaw = answerInput.value;
    const user = normalizeAnswer(userRaw);

    const acceptable = currentClueData.acceptableAnswers.map(normalizeAnswer);

    messageArea.className = 'message-area';

    if (acceptable.includes(user)) {
      messageArea.classList.add('success');
      messageArea.textContent =
        "You're one step closer to solving this murder mystery. Your teacher will give you the next clue.";

      answerInput.disabled = true;
      submitBtn.disabled = true;
      flipCard.style.cursor = 'default';
    } else {
      messageArea.classList.add('error');
      messageArea.textContent = 'Incorrect answer. Try again, detective.';
      answerInput.value = '';
      answerInput.focus();
    }
  }
