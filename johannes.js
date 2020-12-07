
/* ----------------------------- VÄNDA KORT ---------------------------- */


// Väljer alla kort. /* OBS - ska ändras i huvudkoden */
const cards = document.querySelectorAll('.memory-card');

// Har inte vänt något kort, alltså false från början då alla kort är neråt. 
let hasFlippedCard = false;

// Variabel för att kunna låsa spelplanen så man inte kan trycka på fler samtidigt.
let lockBoard = false;

// Skapar variabel för första kortet man klickar, sen det andra. 
let firstCard, secondCard;



function flipCard() {
    // Om spelplanen är låst, återvänder functionen.
    if (lockBoard) return;
    if (this === firstCard) return;


    /* OBS - Flip måste finnas i CSS i huvudkoden */
    this.classList.add('flip');


    // Detta är första klicket, alltså ändrar vi hasFlippedCard till true. 
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

    } else {

        // Är värdet på klicket inte lika med Första kortet, går den in i Andra kortet, och kollar om det matchtar.
        secondCard = this;

        // Kör funktionen där det jämförs om korten är samma. 
        checkForMatch();
    }


}

function checkForMatch() {
    // Jämför värdena på första kortet och andra kortet, och kollar om det är exakt likadant. 


    /* OBS - Ändra värde för jämförelse till värde i huvudkoden */
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        // Om det är samma, tar vi bort Eventlistener. 

        disableCards();
    } else {
        // Är det inte samma, tar vi bort klassen Flip, vilket vänder tillbaka korten, alltså baksida uppåt. 
        unflipCards();
    }
}

function disableCards() {
    // Tar bort eventlistener för att inte kunna trycka på flera eller alla kort samtidigt. 
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // Återställer alla värdena
    resetBoard();
}

function unflipCards() {
    // Här öppnar vi spelplanen för att kunna trycka på ett nytt kort. 
    lockBoard = true;

    // Ger en fördröjning innan vi tar bort klassen Flip, då vänder korten tillbaka till baksidan. 
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        // Återställer alla värdena. 
        resetBoard();
    }, 1500);
}

function resetBoard() {
    // Återställer värdena till att korten är neråt och spelplanen är öppen. 
    [hasFlippedCard, lockBoard] = [false, false];
    // Återställer kortens värde till noll för att kunna trycka på nya kort utan att det krockar med vad vi tryckt på omgången innan. 
    [firstCard, secondCard] = [null, null];


}


// Loopar igenom alla korten och sätter eventlistener på alla kort. card blir THIS längre upp i koden. 


/* OBS - Ändra cards till värde från huvudkoden  */
cards.forEach(card => card.addEventListener('click', flipCard));


// Exporterar alla funktioner. 
/* export { flipCard, unflipCards, resetBoard, checkForMatch, disableCards, cards, hasFlippedCard, lockBoard, firstCard, secondCard }; */


