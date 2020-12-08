// select the elements from the HTML document, which we will change dynamically
let containerCenter = document.querySelector('.container-center');
let containerBottom = document.querySelector('.container-bottom');
let containerTop = document.querySelector('container-top');
let reset = document.querySelector('.reset');
let numberInput = document.querySelector('.number');

let btn = document.querySelector('.btn');
let form = document.querySelector('form');
let load = document.querySelector('.load');
let bottom = document.querySelector('.bottom');
let lucky = document.querySelector('.lucky'); 
const KEY = '891f320f2293b1b8d5cbfb2ba327eef9';



const galleryId = '72157717153796791'; 
     const secret = '432cb32d3669549b';



let time;//time at the beginning of the game
let verificationCard= true;// the variable is used for the stopwatch.checks if the card has been flipped
let idArr = [];//extra-array, which we will use when comparing cards with each other
let tiles_flipped = 0;
let score = 0;//number of points at the beginning of the game



let imgUrls = [];//image array


//constructor Function
function MemoryCard(name,address){ 
    this.name = name;
    this.address = address;

}
//a prototype that sorts all the elements of the array
Array.prototype.randomCards = function(){
    let arrayRandom = [];
    console.log(this.length);
    for (let i =this.length-1; i >=0 ; i--){
        let indexNumber = Math.floor(Math.random()* this.length);
      
        arrayRandom.push(this[indexNumber]);
        this.splice(indexNumber,1); 
    }
    console.log(arrayRandom);
    
    return arrayRandom;
}

let outputTime;//extra variable to which we will assign the function "setTimeout"
//stopwatch function
function stopwatch(){
    let endTime= new Date().getTime();
    let diff= endTime-time;
    let timeElapsed= new Date(diff);
    document.getElementById("output").innerHTML = timeElapsed.getMinutes()+ "m " + timeElapsed.getSeconds() + "s";
   outputTime = setTimeout(stopwatch, 1000);
}




form.addEventListener('submit', (e)=>{
    containerCenter.style.gridTemplateColumns = '1fr';
load.style.display='block';//make the loading element visible on the screen


    

form.style.display = 'none';


  //reset button
    let resetButton = document.createElement('button');
    resetButton.classList.add('reset-button');
    resetButton.innerText = 'Quit Game';
    reset.appendChild(resetButton);
    resetButton.addEventListener('click',function(e){
        location.reload();
    });




//setTimeout make the loading element UNvisible on the screen after 1555ms
setTimeout(() => {
    containerCenter.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr';
  
  const urlAPI= `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.galleries.getPhotos&gallery_id=${galleryId}&format=json&nojsoncallback=1&per_page=${numberInput.value}&page=1?secret=${secret}`;
    fetch(urlAPI)
    .then(function(response){
        if (response.status >= 200 && response.status < 300){
            return response.json();
            }
            else if(response.status === 100){
               
              
                throw response.statusText, 'Fel API-nyckel';
            }
        }
    ).then(
        function(data){
            console.log(data.photos.photo);
            startGame(data.photos.photo);
       
        }
    ).catch(
        function(error){
            console.log(error);
             //skickar ett meddelande till användaren
             alert ('Fel API-nyckel');
        }
    )






    //här ska vi pussla ihop bild urlen
    function startGame(imagesArr){
       // let photos = photoArray;
        
       let photos = imagesArr;
       let size = 'q';
        
        for(let photo of photos){
            let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
            imgUrls.push(url);
        }
        console.log(imgUrls);

        let arr = [];//array for cards
      




//create objects based on the constructor function
        for (let i =0; i< numberInput.value/2; i++){ //divide by 2 because in the next step we are duplicating objects
           // use card1 and card2 to duplicate each object
           //we need each object to have an identical copy, because we will compare them with each other and look for matches
            let card1= new MemoryCard(i,imgUrls[i]);
            let card2= new MemoryCard(i,imgUrls[i]);
//the created objects are placed in an array
            arr.push(card1);
            arr.push(card2);
         
            
        }

 
        arr = arr.randomCards();//sort the cards randomly using the prototype created for the array
    

//we display the created "card" objects on the screen by creating an element div
        for(let i=0; i<arr.length;i++){
            let cardElement = document.createElement('div');
            //each element is assigned a class
            cardElement.setAttribute('class', `card ${arr[i].name}`);
          
    
            //assign and style photo that we got using the flickr API to each card
            cardElement.style.backgroundImage = "url("+arr[i].address+")";
            cardElement.style.backgroundRepeat = "no-repeat"
            cardElement.style.backgroundSize = "cover";
        
           //create two elements that are needed to flip the card
           let frontFace = '<div class="front-face" ></div>'
           let backFace = '<div class="back-face">Crazy nerds</div>';
           cardElement.innerHTML= `${frontFace} ${backFace}`;
         
         //add the created cards to the element container-center 
           containerCenter.appendChild(cardElement);



        }
//a function that displays a message on the screen if the player finds 2 identical cards
  function msgLucky(){
    lucky.style.display = 'flex';
  }
  ///function that removes the message about 2 identical cards from the screen
  function removeMsgLucky(){
    lucky.style.display = 'none';
  }


  //select all cards
       let allCards = document.querySelectorAll('.card');
       for (let i =0; i<allCards.length; i++){
           console.log(allCards);






//when you click on one of the cards, the "Event Listener" starts
            allCards[i].addEventListener('click', function(e) {
                  
                    checkForMatch(this);//run the function that compares the cards
              

                //function that flips the cards
                       function flipCard(someCard){
                       
                       //if this is the first card turned over
                        if (verificationCard){
                            time = new Date().getTime();
                            stopwatch();;//run function
                        }
                        someCard.classList.add('flip');
                        verificationCard = false;//card was flipped

                       }
                       //function that compares the cards
                       function checkForMatch(someCard){
                        if ((!someCard.classList.contains('flip')) && (idArr.length <2)){
                            flipCard(someCard);//run the function flips the cards
                            someCard.id ='card-id-' + arr[i].name;//assign an ID for  card that we clicked on
                            if(idArr.length == 0 || idArr.length == 1){
                                idArr.push(someCard.id);
                                console.log(idArr);

                            }

                        }

                        if (someCard.classList.contains('flip') && idArr.length == 2){
                            if(idArr[0] === idArr[1]){
                                tiles_flipped +=2;//extra-variable that helps to find out the number of identical cards
                                score +=2;//for each match the player receives 2 points
                                idArr = [];


                                msgLucky();//run the function that displays a message on the screen if the player finds 2 identical cards
                                setTimeout(removeMsgLucky,1200);//


                                

                                if(tiles_flipped === arr.length){
                                    console.log("Good Job !!!");
                                    clearTimeout(outputTime);;//stop stopwatch
                                  
                                    containerBottom.style.display = 'block';
                                    bottom.innerText= `You got ${score} points !!!`//message indicating the number of points earned

                                   
                                }
                            
                                }else{//if the cards do not match
                                    function flip2Back(){
                                        let firstCard = document.getElementById(idArr[0]);
                                        let secondCard = document.getElementById(idArr[1]);

                                        firstCard.classList.remove('flip');//remove the "flip" class, which is used to flip cards
                                        firstCard.id = '';//remove id
                                        secondCard.classList.remove('flip');//remove the "flip" class, which is used to flip cards
                                        secondCard.id = '';//remove id
                               
                                        idArr = [];
                               
                                    }
                                    setTimeout(flip2Back, 700);
                                    }
                            }
                        }
                        console.log(tiles_flipped);
                        console.log(arr.length);
                       

                    
                    
                   
                       
                    
                    
                e.preventDefault();
            
            }); 
  
       }
         

       





    }
   
   
   
   
   
   
    load.style.display = 'none';
   
   
   
   

}, 1555);




e.preventDefault();

})