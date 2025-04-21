// Simple JavaScript for the Japanese website
document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current navigation item
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize Flashcards
    initializeFlashcards();
    
    // Initialize Quizzes
    initializeQuizzes();
});

// Flashcard functionality
function initializeFlashcards() {
    const flashcardContainers = document.querySelectorAll('.flashcard-container');
    
    flashcardContainers.forEach(container => {
        const cards = container.querySelectorAll('.flashcard');
        const prevBtn = container.querySelector('.prev-card');
        const nextBtn = container.querySelector('.next-card');
        const flipBtn = container.querySelector('.flip-card');
        let currentIndex = 0;
        
        // Hide all cards except the first one
        cards.forEach((card, index) => {
            if (index !== 0) {
                card.style.display = 'none';
            }
        });
        
        // Enable flip functionality
        if (flipBtn) {
            flipBtn.addEventListener('click', () => {
                cards[currentIndex].classList.toggle('flipped');
            });
        }
        
        // Click on card to flip
        cards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });
        
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                cards[currentIndex].style.display = 'none';
                cards[currentIndex].classList.remove('flipped');
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                cards[currentIndex].style.display = 'block';
                updateCardCounter(container, currentIndex, cards.length);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                cards[currentIndex].style.display = 'none';
                cards[currentIndex].classList.remove('flipped');
                currentIndex = (currentIndex + 1) % cards.length;
                cards[currentIndex].style.display = 'block';
                updateCardCounter(container, currentIndex, cards.length);
            });
        }
        
        // Initialize counter
        updateCardCounter(container, currentIndex, cards.length);
    });
}

function updateCardCounter(container, current, total) {
    const counter = container.querySelector('.card-counter');
    if (counter) {
        counter.textContent = `Card ${current + 1} of ${total}`;
    }
}

// Quiz functionality
function initializeQuizzes() {
    const quizContainers = document.querySelectorAll('.quiz-container');
    
    quizContainers.forEach(container => {
        const questions = container.querySelectorAll('.quiz-question');
        const submitBtn = container.querySelector('.quiz-submit');
        const resetBtn = container.querySelector('.quiz-reset');
        const resultDiv = container.querySelector('.quiz-result');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                let score = 0;
                let totalQuestions = questions.length;
                
                questions.forEach(question => {
                    const options = question.querySelectorAll('input[type="radio"]');
                    const selectedOption = Array.from(options).find(option => option.checked);
                    
                    if (selectedOption && selectedOption.value === 'correct') {
                        score++;
                        question.classList.add('correct');
                        question.classList.remove('incorrect');
                    } else if (selectedOption) {
                        question.classList.add('incorrect');
                        question.classList.remove('correct');
                    }
                });
                
                if (resultDiv) {
                    resultDiv.textContent = `You scored ${score} out of ${totalQuestions}!`;
                    resultDiv.style.display = 'block';
                    
                    if (score === totalQuestions) {
                        resultDiv.classList.add('perfect-score');
                    } else {
                        resultDiv.classList.remove('perfect-score');
                    }
                }
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                questions.forEach(question => {
                    const options = question.querySelectorAll('input[type="radio"]');
                    options.forEach(option => {
                        option.checked = false;
                    });
                    question.classList.remove('correct', 'incorrect');
                });
                
                if (resultDiv) {
                    resultDiv.style.display = 'none';
                }
            });
        }
    });
}
