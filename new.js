// Hämta element från html
let containerCenter = document.querySelector('.container-center');
/* mrdiv.style.display = 'flex'; */
let numberInput = document.querySelector('.number');
let topicInput = document.querySelector('.topic');
let btn = document.querySelector('.btn');
let form = document.querySelector('form');
let load = document.querySelector('.load');


form.addEventListener('submit',function(e){
   
    load.style.display = 'block';

    setTimeout( ()=>{
         
   //let numberValue = numberInput.value;
   console.log(numberInput.value);

   containerCenter.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr';

    // skapar en constructor

function MemoryCard(name, address) {
    this.name = name;
    this.address = address;
    this.order = Math.ceil(Math.random() * 1111);
    this.turnCard = () => {
        console.log('Turn the card' + this.name);
        this.flipped = true;
    };
};

// skapa prototoper

MemoryCard.prototype.flipped = false;
MemoryCard.prototype.matched = false;
MemoryCard.prototype.createElement = function() {
    
    //card
    let cardElement = document.createElement('div');
    cardElement.setAttribute('class', 'card');
    cardElement.innerHTML = this.name;
    cardElement.style.order = this.order;

/* 
    //cover
    let coverElement = document.createElement('div');
    coverElement.setAttribute('class', 'cover');
    coverElement.innerText = "Crazy Nerds";
    cardElement.appendChild(coverElement);
 */

    cardElement.addEventListener('click', () => {
        this.turnCard()
    });
    return cardElement;
};


function createNewGame() {

    for (let i = 1; i <= (numberInput.value)/2; i++) {
        let m = new MemoryCard(i);
        let n = new MemoryCard(i);

        let cardElement = m.createElement();

        containerCenter.appendChild(cardElement);
        containerCenter.appendChild(n.createElement());
        // mrdiv.appendChild(cardElement2);
    }
};

createNewGame();


form.style.display = 'none';
load.style.display = 'none';
    }, 2000);

    e.preventDefault();
})

