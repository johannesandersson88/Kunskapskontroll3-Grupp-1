
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
     let urlGallery = `https://www.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.galleries.getPhotos&gallery_id=${galleryId}&format=json&nojsoncallback=1&per_page=12&page=1?secret=${secret}`;
 
     //efter att eventet utförts läggs knappen som display none för att det inte ska gå att klicka igen
     buttonElement.style.display = 'none';
     
 
 /* --------------------------- FETCH ---------------------------------- */
 
 fetch(urlGallery).then(
     function(response){
         if (response.status >= 200 && response.status < 300){
         return response.json();
         }
         else if(response.status === 100){ 
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
     }
 ).catch(
         function(error){
             console.log(error);
         }
     )
     
 
    //använder setTimeout för att den nya knappen som skapas nedan ska dyka upp efter 1 sekund
     setTimeout(function (){
         resetData();
     }, 1000); 
 }
         
 //);
 
 /* ------------------------- FUNCTION resetData ------------------------ */
 
 function resetData(){
     //skapar element för gameboard
     let resetButton = document.createElement('button');
     //ger knappen samma class som den andra knappen
     resetButton.classList.add('submit-button');
     //skapar ett elemnt för form
     let formElement = document.querySelector('#form');
    //appendar knappen till form så att den syns i webbläsaren
     formElement.appendChild(resetButton);
     //ger knappen en text
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
 
     //lägger till en metod för att blanda korten. 0.5 - random nummer för att det finns 12 par, och 24 kort totalt.
     imgUrls.sort((a,b) => 0.5 - Math.random());
 
     //kallar på funktionen som visar bilderna
     displayImg(imgUrls);
 }
 
 /* ------------------------- FUNCTION displayImg ------------------------ */
 
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
 
  /* -------------------------------------------------------------------- */