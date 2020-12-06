
 /* --------------------------- API-KEY ----------------------------- */
 const apiKey = '3d88a2a15ed640dc5e0725b066d14bb9';


 /* --------------------- START GAME-FUNCTION  -------------------------*/
 /* ------------------------- GALLERY-URL  -----------------------------*/
 
 let buttonElement = document.querySelector('#abstract-button');
 
 buttonElement.addEventListener('click', startGame);
     
 function startGame(event){
 
     event.preventDefault();
 
     const galleryId = '72157717153796791'; 
     const secret = '432cb32d3669549b';
     //let buttonOne = document.querySelector('#abstract-button'); 
     let urlGallery = `https://www.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.galleries.getPhotos&gallery_id=${galleryId}&format=json&nojsoncallback=1?secret=${secret}`;
 
     //efter att eventet utförts läggs knappen som display none för att det inte ska gå att klicka igen
     buttonElement.style.display = 'none';
     
     
 
 
 /* ------------------------ SEARCH THEME -----------------------------*/
 
 
 /* //skapar element för #form
 let formElement = document.querySelector('#form');
 
 
 //lägger till en eventlistener
 buttonElement.addEventListener('click', 
     function(event){
         event.preventDefault();
 
     
         //skapar en variabel som sparar det inmatade värdet i input
         let theme = themeInput.value;
         //efter en inmatning i input ändras rutan till tom
         themeInput.value = '';
         // en if-sats som skickar ett meddelande om användaren gör en sökning utan att ha skrivit in något i input-fältet 
         if (theme == ''){
             alert('Choose a theme');
         } */
 
 /* --------------------------- URL ------------------------------------*/        
         /*let searchTheme = '';
         const url = `https://www.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&text=${searchTheme}&format=json&nojsoncallback=1&per_page=12&page=1`; */
 
 
 /* const url = `https://www.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&text=${theme}&format=json&nojsoncallback=1&per_page=12&page=1`; */
 
 
 
 
 
 let cardArray = [];
 
 /* --------------------------- FETCH ---------------------------------- */
 
 fetch(urlGallery).then(
     function(response){
         if (response.status >= 200 && response.status < 300){
         return response.json();
         }
         else if(response.status === 100){ //titta vidare på detta
             //skickar ett meddelande till användaren
             alert ('Fel API-nyckel');
             //meddelande i consolen
             throw response.statusText, 'Fel API-nyckel';
         }
     }
 ).then(
     function(data){
         console.log(data);
         //console.log(data.photos.photo); //array med tolv element
         let imgArray = data.photos.photo;
         console.log(imgArray, 'här är imgArray');
         collectImg(data.photos.photo); //array med tolv element (som sedan dubbleras längre ned)
         
 /* KOMMENTERAR UT TILLFÄLLIGT. MEDINES DEL
         //genom en for-loop har vi skapat variabler för varje api-data vilket sedan ger 12 kortobjekt i en instansmetod
         for (let j = 0; j < 12; j++){
             let server = imgArray[j].server;
             let id = imgArray[j].id;
             let secret = imgArray[j].secret;
             console.log(server, id, secret);
             let number = j + 1;
             let size = 'q';
 
             //skapar ett instansobjekt som skickas till constructorn
             let newCard = new Card(number, server, id, secret, size);  
             //lägger till alla kort i cardArray
             cardArray.push(newCard);
             
         }
 
         //dubblerar korten genom att pusha in en till cardArray
         cardArray.push(...cardArray);
         console.log(cardArray, 'tjohej'); */
         
         
     }
 ).catch(
         function(error){
             console.log(error);
         }
     )
     
 
 
     setTimeout(function (){
         resetData();
     }, 1000); 
 }
         
 //);
 
 /* ------------------------- FUNCTION resetData ------------------------ */
 
 function resetData(){
     //skapar element för gameboard
     let resetButton = document.createElement('button');
     resetButton.classList.add('submit-button');
     let formElement = document.querySelector('#form');
 
     formElement.appendChild(resetButton);
     resetButton.innerText = 'Quit Game';
 }
 
 
 /* ------------------------- FUNCTION collectImg ------------------------ */
 
 let imgUrls = [];
 
 //skapar en funktion för att hämta bilderna
 function collectImg(imagesArr){
     let photos = imagesArr;
     let size = 'q';
 
     for (let photo of photos){
         let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
 
         imgUrls.push(url);
     }
 
     //dubblerar imgUrls-arrayen så att vi får två av varje kort
     imgUrls.push(...imgUrls);
 
     //imgUrls.push(cardArray);
 
     //lägger till en metod för att blanda korten. 0.5 - random nummer för att det finns 12 par, och 24 kort totalt. FORTSÄTT HÄR
     imgUrls.sort((a,b) => 0.5 - Math.random());
 
     //kallar på funktionen som visar bilderna
     //displayImg(cardArray);
     displayImg(imgUrls);
 }
 
 /* ------------------------- FUNCTION displayImg ------------------------ */
 
 //FORTSÄTT HÄR!! :D
 
 //skapar en funktion som visar bilderna
 function displayImg(urls){
     let gameboardElement = document.querySelector('.gameboard');
 
     for(let url of urls){
         let img = document.createElement('img');
         img.src = url;
         img.classList.add('card');
         gameboardElement.appendChild(img);
     }
 
 }
 
 
 /* ------------------------- CARD CONSTRUCTOR ---------------------------*/
 
 /* 
 //Egenskaper:
     - Url
 
 
 //Metoder:
     - Vända kort
     - Poäng
     - Osv..
 
  */
 
 
 
 
 /* KOMMENTERAR UT TILLFÄLLIGT. Medines del
 //constructor
 function Card(number, server, id, secret, size){
     this.number = number;
     this.url = `https://live.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
 }
 
 let memoryCard = new Card() */
 
 /* let cardArray = [];
             for (let i = 0; i < 24; i++){
                 cardArray[i] = new Card(url);
 
                 console.log(cardArray[i]);
                 } 
 console.log(cardArray, 'nu är vi här'); */
 
 
 /* //constructor
 function Card(url, photo, size){
     this.url = url;
     this.url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
 }
 
 let cardArray = [];
             for (let i = 0; i < 24; i++){
                 cardArray[i] = new Card(url);
 
                 console.log(cardArray[i]);
                 } 
 console.log(cardArray, 'nu är vi här'); */
 
 
 
 
  /* -------------------------------------------------------------------- */