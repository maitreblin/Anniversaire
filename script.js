// Base de données des énigmes
const riddles = [
    {
        question: "Bienvenue au grand jeu des énigmes d'anniversaire ! 🥳<br><br>Pour aller au bout de ce jeu et que la chance soit de notre côté, on dit qu'il faut \"toucher du bois\". Mais pour cela, qui faut-il <strong>appeler</strong> ?",
        answer: "0233289099", // Le numéro exact sans espace ni ponctuation
        alternatives: ["02 33 28 90 99", "02-33-28-90-99", "02.33.28.90.99", "0233289099", "caca"]
    },
    {
        question: "Une bonne pizza 4 fromages est composée exclusivement de fromages italiens. <br><br>Mozarella, Parmesan, Gorgonzola et...",
        answer: "Ricotta",
        alternatives: ["Ricotta", "ricotta", "la ricotta", "ricotta italienne"]
    },
    {
        question: "Un nénuphar se trouve dans un étang, chaque jour il double de taille. Il recouvre la totalité de l'étang en un mois (30 jours). <br><br>Quel jour le nénuphar aura-t-il couvert précisément la moitié de l'étang ?",
        answer: "29",
        alternatives: ["29", "le 29", "jour 29", "29ème jour", "le 29ème jour", "29eme jour", "le 29eme jour", "vingt-neuf", "vingt neuf"]
    },
    {
        question: "Quelle est la couleur du cheval blanc d'Henri IV ?",
        answer: "Blanc",
        alternatives: ["Blanc", "blanc", "le blanc", "le cheval blanc", "cheval blanc", "cheval blanc d'henri iv"]
    },
    {
        question: "En parlant de Cheval Blanc... <br><br><img src='images/Patrick%20Letard.png' alt='Image énigme'><br>Qui suis-je ?",
        answer: "Patrick Letard",
        alternatives: ["Patrick Letard", "patrick letard", "le patrick letard", "le patrick", "patrick", "letard"]
    }
];

// État de l'application
let currentRiddleIndex = 0;
let totalRiddles = riddles.length;
const BIRTHDAY_DATE = '18-10-1973'; // Format DD-MM-YYYY

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    setupWelcomeScreen();
});

function setupWelcomeScreen() {
    const startBtn = document.getElementById('start-btn');
    const birthdayInput = document.getElementById('birthday-input');

    // Formatage automatique avec tirets
    birthdayInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Supprimer tous les caractères non numériques
        
        // Limiter à 8 chiffres (DDMMYYYY)
        if (value.length > 8) {
            value = value.substring(0, 8);
        }
        
        // Ajouter les tirets automatiquement
        let formatted = value;
        if (value.length > 2) {
            formatted = value.substring(0, 2) + '-' + value.substring(2);
        }
        if (value.length > 4) {
            formatted = value.substring(0, 2) + '-' + value.substring(2, 4) + '-' + value.substring(4);
        }
        
        e.target.value = formatted;
    });

    startBtn.addEventListener('click', handleBirthdayCheck);
    
    // Validation avec la touche Entrée
    birthdayInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleBirthdayCheck();
        }
    });

    // Afficher l'écran d'accueil
    document.getElementById('welcome-screen').style.display = 'flex';
}

function handleBirthdayCheck() {
    const birthdayInput = document.getElementById('birthday-input');
    const welcomeFeedback = document.getElementById('welcome-feedback');
    const selectedDate = birthdayInput.value;

    if (!selectedDate) {
        showWelcomeFeedback("Veuillez entrer une date de naissance.", "error");
        return;
    }

    if (selectedDate === BIRTHDAY_DATE) {
        // Date correcte - afficher l'animation d'anniversaire
        showBirthdayAnimation();
    } else {
        // Date incorrecte - message d'erreur
        showWelcomeFeedback("Date incorrecte. Veuillez réessayer.", "error");
    }
}

function showBirthdayAnimation() {
    // Masquer l'écran d'accueil
    document.getElementById('welcome-screen').style.display = 'none';
    
    // Afficher l'écran d'anniversaire
    const birthdayScreen = document.getElementById('birthday-screen');
    birthdayScreen.style.display = 'flex';
    
    // Après 3 secondes, lancer le jeu
    setTimeout(() => {
        startGame();
    }, 3000);
}

function showWelcomeFeedback(message, type) {
    const feedback = document.getElementById('welcome-feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type} show`;
    
    // Masquer le feedback après 3 secondes
    setTimeout(() => {
        feedback.className = 'feedback';
    }, 3000);
}

function startGame() {
    // Masquer l'écran d'anniversaire
    document.getElementById('birthday-screen').style.display = 'none';
    
    // Afficher l'écran de jeu
    document.getElementById('game-screen').style.display = 'flex';
    
    // Initialiser le jeu
    initializeApp();
    setupEventListeners();
}

function initializeApp() {
    // Charger la progression depuis localStorage
    const savedProgress = localStorage.getItem('riddleProgress');
    if (savedProgress !== null) {
        currentRiddleIndex = parseInt(savedProgress, 10);
        // S'assurer que l'index est valide
        if (currentRiddleIndex >= riddles.length) {
            currentRiddleIndex = 0;
        }
    } else {
        currentRiddleIndex = 0;
    }
    
    // Mettre à jour le total d'énigmes
    document.getElementById('total-riddles').textContent = totalRiddles;
    
    // Afficher l'énigme actuelle
    displayRiddle(currentRiddleIndex);
    updateProgress();
}

function setupEventListeners() {
    const submitBtn = document.getElementById('submit-btn');
    const answerInput = document.getElementById('answer-input');
    const modalClose = document.querySelector('.modal-close');
    const modalOkBtn = document.getElementById('modal-ok-btn');

    // Validation au clic sur le bouton
    submitBtn.addEventListener('click', validateAnswer);

    // Validation avec la touche Entrée
    answerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validateAnswer();
        }
    });

    // Fermer la modal
    if (modalClose) {
        modalClose.addEventListener('click', hideHintModal);
    }
    if (modalOkBtn) {
        modalOkBtn.addEventListener('click', hideHintModal);
    }

    // Fermer la modal en cliquant en dehors
    const modal = document.getElementById('hint-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideHintModal();
            }
        });
    }

    // Focus automatique sur l'input
    answerInput.focus();
}

function displayRiddle(index) {
    if (index >= riddles.length) {
        showVictory();
        return;
    }

    const riddle = riddles[index];
    document.getElementById('riddle-question').innerHTML = riddle.question;
    document.getElementById('current-riddle').textContent = index + 1;
    
    // Réinitialiser l'input et le feedback
    const answerInput = document.getElementById('answer-input');
    answerInput.value = '';
    answerInput.disabled = false;
    answerInput.focus();
    
    document.getElementById('submit-btn').disabled = false;
    hideFeedback();
    
    updateProgress();
}

function validateAnswer() {
    const answerInput = document.getElementById('answer-input');
    const userAnswer = answerInput.value.trim().toLowerCase();
    const currentRiddle = riddles[currentRiddleIndex];
    
    // Vérification spéciale pour la première énigme - détecter "Denis Bouvier"
    if (currentRiddleIndex === 0 && userAnswer.includes('denis') && userAnswer.includes('bouvier')) {
        showHintModal("Oui c'est bien de Denis Bouvier qu'il s'agit. Mais relisez bien la question.");
        answerInput.focus();
        return;
    }
    
    // Vérifier si la réponse est correcte (exacte ou dans les alternatives)
    const isCorrect = userAnswer === currentRiddle.answer.toLowerCase() || 
                      currentRiddle.alternatives.some(alt => alt.toLowerCase() === userAnswer);

    if (isCorrect) {
        showFeedback("✅ Correct ! Excellente réponse !", "success");
        answerInput.disabled = true;
        document.getElementById('submit-btn').disabled = true;
        
        // Passer à l'énigme suivante après 2 secondes
        setTimeout(() => {
            currentRiddleIndex++;
            saveProgress();
            displayRiddle(currentRiddleIndex);
        }, 2000);
    } else {
        showFeedback("❌ Incorrect. Essayez encore !", "error");
        answerInput.focus();
    }
}

function showHintModal(message) {
    const modal = document.getElementById('hint-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

function hideHintModal() {
    const modal = document.getElementById('hint-modal');
    modal.style.display = 'none';
}

function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type} show`;
}

function hideFeedback() {
    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback';
}

function saveProgress() {
    localStorage.setItem('riddleProgress', currentRiddleIndex.toString());
}

function resetGame() {
    localStorage.removeItem('riddleProgress');
    location.reload();
}

function updateProgress() {
    const progress = ((currentRiddleIndex + 1) / totalRiddles) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
}

function showVictory() {
    const riddleCard = document.querySelector('.riddle-card');
    riddleCard.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
            <h2 style="font-size: 1.8rem; color: #667eea; margin-bottom: 15px;">Félicitations !</h2>
            <p style="font-size: 1.1rem; color: #666; line-height: 1.6;">
                Vous avez résolu toutes les énigmes !<br>
                Vous êtes un véritable maître des énigmes !
            </p>
            <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 30px; align-items: center;">
                <button 
                    id="restart-btn" 
                    style="width: 100%; max-width: 250px; padding: 15px 30px; font-size: 1rem; font-weight: 600; color: white; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 10px; cursor: pointer; font-family: inherit;"
                >
                    Rejouer au début
                </button>
                <button 
                    id="reset-btn" 
                    style="width: 100%; max-width: 250px; padding: 15px 30px; font-size: 1rem; font-weight: 600; color: white; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 10px; cursor: pointer; font-family: inherit;"
                >
                    Nouvelle partie
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('restart-btn').addEventListener('click', resetGame);
    document.getElementById('reset-btn').addEventListener('click', resetGame);
}

