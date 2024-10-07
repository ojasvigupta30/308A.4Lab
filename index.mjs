import * as Carousel from "./Carousel.mjs";
// import axios from "axios";

// The breed selection input element.
let breedSelect = document.getElementById("breedSelect");
// The information section div element.
let infoDump = document.getElementById("infoDump");
// The progress bar div element.
let progressBar = document.getElementById("progressBar");
// The get favourites button element.
let getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
let API_KEY = "live_6icdkI24DAt2qqxh8PNx9ju6mRG9pTM1asEa8KFxkt15HCrODmPE6QomKWLvu8AG";


/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

// console.log(`hello`);


// async function initialLoad() {

//   // https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEY
//   let response = await fetch("https://api.thecatapi.com/v1/breeds", {
//     headers: { "x-api-key": API_KEY }
//   });

//   // console.log(response.ok);
//   // console.log(response.status);

//   let breeds = await response.json();

//   for (let i = 0; i < breeds.length; i++) {
//     let option = document.createElement(`option`);
//     option.setAttribute(`value`, breeds[i].id);
//     // console.log(breeds[i]);
//     option.textContent = breeds[i].name;
//     breedSelect.appendChild(option);
//     // console.log(option);
//   }

//   // console.log(`hell`);
//   // // console.log(response);
//   // console.log(breeds);

// }

// initialLoad();



/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

// breedSelect.addEventListener(`change`, async function addImageToCarouselFunction(eve) {

//   // console.log(eve.target.value);

//   Carousel.clear();
//   infoDump.innerHTML = ``;

//   let breedsId = eve.target.value;

//   let response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${breedsId}&limit=5&api_key=${API_KEY}`);

//   console.log(response.ok);
//   console.log(response.status);



//   let breedImgFacts = await response.json();

//   console.log(breedImgFacts);

//   console.log(Carousel.createCarouselItem);


//   for (let i = 0; i < breedImgFacts.length; i++) {
//     console.log(breedImgFacts[i]);

//     let imgSrc = breedImgFacts[i].url;
//     let imgAlt = breedImgFacts[i].breeds.name;
//     let imgId = breedImgFacts[i].id;

//     let newImgItem = Carousel.createCarouselItem(imgSrc, imgAlt, imgId);

//     Carousel.appendCarousel(newImgItem);
//     Carousel.start();


//   }

//   let breedInfo = document.createElement('div');
//   breedInfo.textContent = `Facts about ${breedImgFacts[0].breeds[0].name}: ${breedImgFacts[0].breeds[0].description}`;
//   infoDump.appendChild(breedInfo);


// }


// );


/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */

let axiosInstance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'x-api-key': API_KEY
  }
});


initialLoad();

// Now replace your fetch calls with axios like below:

async function initialLoad() {
  let response = await axiosInstance.get('/breeds');
  let breeds = response.data;

  console.log(breeds);

  for (let i = 0; i < breeds.length; i++) {
    let option = document.createElement('option');
    option.setAttribute('value', breeds[i].id);
    option.textContent = breeds[i].name;
    breedSelect.appendChild(option);
  }
}


breedSelect.addEventListener('change', addImageToCarouselFunction);

  
  async function addImageToCarouselFunction(eve) {
  Carousel.clear();
  infoDump.innerHTML = '';


  let breedsId = eve.target.value;
  let response = await axiosInstance.get(`/images/search?breed_id=${breedsId}&limit=5`);

  let breedImgFacts = response.data;


   if (!breedImgFacts || breedImgFacts.length === 0) {
    let noDataMsg = document.createElement('p');
    noDataMsg.textContent = 'No images available for this breed.';
    infoDump.appendChild(noDataMsg);
    return;

  }


  for (let i = 0; i < breedImgFacts.length; i++) {
    let imgSrc = breedImgFacts[i].url;
    let imgAlt = breedImgFacts[i].breeds.name;
    let imgId = breedImgFacts[i].id;

    let newImgItem = Carousel.createCarouselItem(imgSrc, imgAlt, imgId);
    Carousel.appendCarousel(newImgItem);
    Carousel.start();
  }

  let breedInfo = document.createElement('div');
  breedInfo.textContent = `Facts about ${breedImgFacts[0].breeds[0].name}: ${breedImgFacts[0].breeds[0].description}`;
  infoDump.appendChild(breedInfo);
}




/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

axiosInstance.interceptors.request.use(request => {
  request.metadata = request.metadata || {};
  request.metadata.startTime = new Date().getTime();
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
      response.config.metadata.endTime = new Date().getTime();
      response.config.metadata.durationInMS = response.config.metadata.endTime - response.config.metadata.startTime;

      console.log(`Request took ${response.config.metadata.durationInMS} milliseconds.`)
      return response;
  },
  (error) => {
      error.config.metadata.endTime = new Date().getTime();
      error.config.metadata.durationInMS = error.config.metadata.endTime - error.config.metadata.startTime;

      console.log(`Request took ${error.config.metadata.durationInMS} milliseconds.`)
      throw error;
});




/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */


function updateProgress(progressEvent) {
  let progress = (progressEvent.loaded * 100) / progressEvent.total;
  progressBar.style.width = `${progress}%`;
}

axiosInstance.interceptors.request.use(request => {
  progressBar.style.width = '0%';
  request.onDownloadProgress = updateProgress;
  return request;
});





/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */



/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
    try {
      // Check if this image is already favourited
      let favouritesResponse = await axiosInstance.get('/favourites');
      let favouriteExists = favouritesResponse.data.find(fav => fav.image_id === imgId);
  
      if (favouriteExists) {
        // If favourited, unfavorite the image
        await axiosInstance.delete(`/favourites/${favouriteExists.id}`);
        console.log(`Image ${imgId} removed from favourites.`);
      } else {
        // Otherwise, favourite the image
        await axiosInstance.post('/favourites', { image_id: imgId });
        console.log(`Image ${imgId} added to favourites.`);
      }
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  }
  

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */


async function getFavourites() {
  Carousel.clear();
  infoDump.innerHTML = '';

  let response = await axiosInstance.get('/favourites');
  let favourites = response.data;

  for (let i = 0; i < favourites.length; i++) {
    let imgSrc = favourites[i].image.url;
    let imgAlt = 'Favourite Image';
    let imgId = favourites[i].image_id;

    let newImgItem = Carousel.createCarouselItem(imgSrc, imgAlt, imgId);
    Carousel.appendCarousel(newImgItem);
    Carousel.start();
  }
}

getFavouritesBtn.addEventListener('click', getFavourites);



/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */


