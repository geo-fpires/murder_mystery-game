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
      story: 'At 7:00 p.m., Mr. Brown was sitting on the reception sofas. He was waiting for someone, but he looked very nervous. He was tapping his foot and checking his watch. There were two other students there, but they were listening to music. Then, at 7:05, Mr. Brown stood up and walked to the secretary desk.',
      question: 'Where did Mr. Brown go after leaving the sofas?',
      correctAnswer: 'SECRETARY',
      coverImage: 'cartao_pista_1.png' // Imagem para a Pista 1
    },
    {
      id: 2,
      story: 'At 7:10 p.m., Mr. Brown arrived at the secretary desk. He asked, “Can I borrow a book from the language shelf?” The secretary answered, “Yes, you can. But you should be careful. Some books are very old and heavy.” Mr. Brown said, “I will be careful.” Then he walked towards the language shelf.',
      question: 'Where did Mr. Brown want to go?',
      correctAnswer: 'SHELF',
      coverImage: 'cartao_pista_2.png' // Exemplo: Imagem para a Pista 2
    },
    {
      id: 3,
      story: 'At the language shelf, there were many books in different languages. Some books were bigger and heavier than others. Mr. Brown took one of the heaviest books. It was called “Great Crimes of the World”. He looked inside the book and then walked to the main corridor. He was holding the book very tightly.',
      question: 'Where did Mr. Brown go after taking the book?',
      correctAnswer: 'CORRIDOR',
      coverImage: 'cartao_pista_3.png' // Exemplo: Imagem para a Pista 3
    },
    {
      id: 4,
      story: 'At 7:20 p.m., Mr. Brown was walking slowly along the main corridor. He was still carrying the heavy book. A student saw him and later said, “Mr. Brown looked worried. A few minutes later, I saw Ms. White. She was walking very fast towards the small garden. She wasn’t wearing her glasses, I think.”',
      question: 'Where was Ms. White going?',
      correctAnswer: 'GARDEN',
      coverImage: 'cartao_pista_4.png' // Exemplo: Imagem para a Pista 4
    },
    {
      id: 5,
      story: 'At 7:25 p.m., a student was looking at the plants in the small garden. Suddenly, they heard a loud noise from the corridor. It sounded like a heavy object falling. The student looked up and saw a shadow moving quickly towards the bathrooms. The student was scared and didn’t move.',
      question: 'Where did the shadow go after the noise?',
      correctAnswer: 'BATHROOMS',
      coverImage: 'cartao_pista_5.png' // Exemplo: Imagem para a Pista 5
    },
    {
      id: 6,
      story: 'At around 7:27 p.m., another student was washing their hands in the bathroom. They heard someone running in the corridor. They couldn’t see the person clearly, but they saw a shadow go into the lavabo. A few minutes later, Ms. White came out of the lavabo. She looked pale and had a small cut on her right hand. She said, “I need to find my glasses.” Then she walked away quickly.',
      question: 'Where did the shadow go before Ms. White came out?',
      correctAnswer: 'LAVABO',
      coverImage: 'cartao_pista_6.png' // Exemplo: Imagem para a Pista 6
    },
    {
      id: 7,
      story: 'At 8:00 p.m., the police arrived. They first checked the reception area. Later, they searched the school and found something in the lavabo. On the floor, there was a pair of broken glasses and a small drop of blood. The glasses were not Mr. Brown’s. Meanwhile, in the corridor near the language shelf, they discovered Mr. Brown’s body. He had a head injury, and a heavy book – “Great Crimes of the World” – was on the floor beside him.',
      question: 'Where did the police begin the investigation?',
      correctAnswer: 'RECEPTION',
      coverImage: 'cartao_pista_7.png' // Exemplo: Imagem para a Pista 7
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

  function checkAnswer() {
    if (!currentClueData) return;

    const user = answerInput.value.trim().toUpperCase();
    const expected = currentClueData.correctAnswer.toUpperCase();

    messageArea.className = 'message-area';

    if (user === expected) {
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
});
