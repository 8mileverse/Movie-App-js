const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
  },
  api: {
    API_KEY: "63b797eecf604f8d910938f3a5f3f2db",
    API_URL: "https://api.themoviedb.org/3/",
  },
};

// Displaying Popular Movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  //   loop through the results which has become an array of popular movies

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` 
    
        <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
              ? `

              <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              /> 
              `
              : ` <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
              />`
          }
        </a>
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
        </div>
    
      
      `;
    document.querySelector("#popular-movies").appendChild(div);
  });
}

// Displaying Popular TV Shows
async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");
  //   loop through the results which has become an array of popular movies

  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` 
    
        <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path
              ? `

              <img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
              /> 
              `
              : ` <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${show.title}"
              />`
          }
        </a>
        <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
        </div>
    
      
      `;
    document.querySelector("#popular-shows").appendChild(div);
  });
}

// display Movie Details
async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const movie = await fetchAPIData(`movie/${movieId}`);

  // overlay for background image
  displayMovieBackground("movie", movie.backdrop_path);

  const div = document.createElement("div");

  div.innerHTML = `
    <div class="details-top">
    <div>
    ${
      movie.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      class="card-img-top"
      alt="${movie.title}"
    />`
        : `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${movie.title}"
  />`
    }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
      </ul>
      <a href="${
        movie.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>

  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
        movie.budget
      )}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
        movie.revenue
      )}</li>
      <li><span class="text-secondary">Runtime:</span> ${addCommasToNumber(
        movie.runtime
      )} mins</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
      
    <h4>Production Companies</h4>
    <div class="list-group">
      ${movie.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(" , ")}
    </div>
  </div>
    `;

  document.querySelector("#movie-details").appendChild(div);
}

// displaySpinner
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// displayMovieBackdrop
function displayMovieBackground(type, backdropPath) {
  const overlaydiv = document.createElement("div");
  overlaydiv.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${backdropPath})`;
  overlaydiv.style.backgroundSize = "cover";
  overlaydiv.style.backgroundPosition = "center";
  overlaydiv.style.backgroundRepeat = "no-repeat";
  overlaydiv.style.height = "100vh";
  overlaydiv.style.width = "100vw";
  overlaydiv.style.position = "absolute";
  overlaydiv.style.top = "0";
  overlaydiv.style.left = "0";
  overlaydiv.style.zIndex = "-1";
  overlaydiv.style.opacity = "0.3";

  if (type == "movie") {
    document.querySelector("#movie-details").appendChild(overlaydiv);
  } else {
    document.querySelector("#tv-details").appendChild(overlaydiv);
  }
}

// display TV Details
function displayShowBackground(type, backdropPath) {
  const overlaydiv = document.createElement("div");
  overlaydiv.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${backdropPath})`;
  overlaydiv.style.backgroundSize = "cover";
  overlaydiv.style.backgroundPosition = "center";
  overlaydiv.style.backgroundRepeat = "no-repeat";
  overlaydiv.style.height = "100vh";
  overlaydiv.style.width = "100vw";
  overlaydiv.style.position = "absolute";
  overlaydiv.style.top = "0";
  overlaydiv.style.left = "0";
  overlaydiv.style.zIndex = "-1";
  overlaydiv.style.opacity = "0.3";

  if (type == "tv") {
    document.querySelector("#show-details").appendChild(overlaydiv);
  } else {
    document.querySelector("#movie-details").appendChild(overlaydiv);
  }
}

// display TV Details
async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];
  const show = await fetchAPIData(`tv/${showId}`);

  // overlay for background image
  displayShowBackground("tv", show.backdrop_path);

  const div = document.createElement("div");

  // // Create seasons list
  // const seasonsList = show.seasons
  //   .map((season) => `<li>${season.name} (${season.episode_count} episodes)</li>`)
  //   .join("");       <li><span class="text-secondary">Seasons:</span> ${seasonsList} </li>

  div.innerHTML = `
    <div class="details-top">
      <div>
        ${
          show.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}" />`
            : `<img src="../images/no-image.jpg" class="card-img-top" alt="${show.name}" />`
        }
      </div>
      <div>
        <h2>${show.name}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${show.first_air_date}</p>
        <p>${show.overview}</p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
        </ul>
        <a href="${
          show.homepage
        }" target="_blank" class="btn">Visit Show Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Show Info</h2>
      <ul>
        <li><span class="text-secondary">Number Of Episodes:</span> ${
          show.number_of_episodes
        }</li>
        <li><span class="text-secondary">Last Episode To Air:</span> ${
          show.last_episode_to_air.name
        }</li>
        </li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">
        ${show.production_companies
          .map((company) => `<span>${company.name}</span>`)
          .join(", ")}
      </div>
    </div>
    `;

  document.querySelector("#show-details").appendChild(div);
  
}

// Global Fetching From API DataBase
async function fetchAPIData(endpoint) {
  const API_KEY = global.api.API_KEY;
  const API_URL = global.api.API_URL;

  // show spinner before the request is made

  showSpinner();

  const res = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();

  hideSpinner(); // hide spinner after the request is made
  // console.log(data);

  return data;
}

// Search Fetching From Api Database
async function searchAPIData() {
  const API_KEY = global.api.API_KEY;
  const API_URL = global.api.API_URL;

  // show spinner before the request is made

  showSpinner();

  const res = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`
  );

  const data = await res.json();

  hideSpinner(); // hide spinner after the request is made
  // console.log(data);

  return data;
}
// Dislay the sliderMovies
async function displaySlider() {
  // when is to be displayed when doing parents

  const { results } = await fetchAPIData("movie/now_playing");
  console.log(results);

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `      
              <a href="movie-details.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${
                  movie.poster_path
                }" alt="${movie.title}" /> 
              </a>
              <h4 class="swiper-rating">
                <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
                  1
                )} / 10
              </h4>
              
    
      `;
    //note: when fetching an inmage always place it with the link of https

    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
}

// Diplay the Slider for the Tv shows
async function displaySliderTv() {
  // Fetch TV shows airing today
  const { results } = await fetchAPIData("tv/on_the_air");

  // Loop through the results and create slides
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    // Fix the href to link to the TV details page
    div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
          <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${
      show.name
    }" />
        </a>
        <h4 class="swiper-rating">
          <i class="fas fa-star text-secondary"></i> ${show.vote_average.toFixed(
            1
          )} / 10
        </h4>
      `;

    // Append each slide to the swiper-wrapper
    document.querySelector(".swiper-wrapper").appendChild(div);
  });

  // Initialize the Swiper after all slides have been added
  initSwiper();
}

// seacrh movies/shows
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get("type"); // called from the html attribute type
  global.search.term = urlParams.get("search-term"); //called from the html attribute name

  if (global.search.term !== "" && global.search.term !== null) {
    // @todo - make request and display results

    const { results } = await searchAPIData(); // the results is brought as an object in which arrays are placed inside, hence the destructuring
    if (results.length === 0) {
      showAlert("No Results found", "success");
    }

    displaySearchResults(results);

    document.querySelector('#search').value = ""
  } else {
    showAlert("Please Enter A Search Term");
  }
}

// function to display the search results

function displaySearchResults(results) {
  // const results = document.createElement('div');
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` 
    
        <a href="${global.search.type}-details.html?id=${result.id}">
          ${
            result.poster_path
              ? `

              <img
                src="https://image.tmdb.org/t/p/w500${global.search.type === "movie" ? result.poster_path: result.poster_path}"
                class="card-img-top"
                alt="${
                  global.search.type === "movie" ? result.title : result.name
                }"
              /> 
              `
              : ` <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${
                  global.search.type === "movie" ? result.title : result.name
                }"
              />`
          }
        </a>
        <div class="card-body">
            <h5 class="card-title">${global.search.type === "movie" ? result.title : result.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${global.search.type === "movie" ? result.release_date : result.airing_today || result.first_air_date}</small>
            </p>
        </div>
    
      
      `;
    document.querySelector("#search-results").appendChild(div);
  });
}

// for the Swiper Js
function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      700: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
}

// Highlight in Active Link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      // if the link whish has the href attribute, is equal to the current page

      link.classList.add("active"); // add the active class to the link
    }
  });
}

// adding the comma's to the figures
function addCommasToNumber(figure) {
  const number = figure.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //regex
  return number;
}

//  Displaying Alert

function showAlert(message, className) {
  const alertDisplay = document.createElement("div");
  alertDisplay.classList.add("alert", className = "error");

  alertDisplay.appendChild(document.createTextNode(message)); // when creating an alert, you can add to the dom as a message
  document.querySelector("#alert").appendChild(alertDisplay);

  setTimeout(() => {
    alertDisplay.classList.add("fade-out"); // Add fade-out class

    // Wait for the CSS transition to complete before removing the element
    setTimeout(() => {
      alertDisplay.remove();
    }, 3000); // Match this duration with the CSS transition
  }, 3000); // Time before starting the fade-out
}
// INIT THE APP
function init() {
  switch (global.currentPage) {
    case "/":
      displaySlider();
      displayPopularMovies();
      break;

    case "/index":
      console.log("Home");
      break;

    case "/movie-details.html":
      displayMovieDetails();
      break;

    case "/tv-details.html":
      displayShowDetails();
      break;

    case "/shows.html":
      displaySliderTv();
      displayPopularShows();
      break;

    case "/search.html":
      search();
      break;

    default:
      console.log("Page does not exist");
  }
}

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("DOMContentLoaded", highlightActiveLink);
// document.addEventListener("DOMContentLoaded", displayPopularMovies)
