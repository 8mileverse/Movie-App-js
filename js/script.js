const global = {
  currentPage: window.location.pathname,
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
  displayMovieBackground('movie', movie.backdrop_path);
  
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
    <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
    <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
    <li><span class="text-secondary">Runtime:</span> ${addCommasToNumber(movie.runtime)} mins</li>
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
  overlaydiv.style.backgroundSize = 'cover';
  overlaydiv.style.backgroundPosition = 'center';
  overlaydiv.style.backgroundRepeat = 'no-repeat';
  overlaydiv.style.height = '100vh';
  overlaydiv.style.width = '100vw';
  overlaydiv.style.position = 'absolute';
  overlaydiv.style.top = '0';
  overlaydiv.style.left = '0';
  overlaydiv.style.zIndex = '-1';
  overlaydiv.style.opacity = '0.3';

  if (type == 'movie') {
   document.querySelector('#movie-details').appendChild(overlaydiv)
  }
  else{
    document.querySelector('#tv-details').appendChild(overlaydiv)
  }
}

// display TV Details
function displayShowBackground(type, backdropPath) {
  const overlaydiv = document.createElement("div");
  overlaydiv.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${backdropPath})`;
  overlaydiv.style.backgroundSize = 'cover';
  overlaydiv.style.backgroundPosition = 'center';
  overlaydiv.style.backgroundRepeat = 'no-repeat';
  overlaydiv.style.height = '100vh';
  overlaydiv.style.width = '100vw';
  overlaydiv.style.position = 'absolute';
  overlaydiv.style.top = '0';
  overlaydiv.style.left = '0';
  overlaydiv.style.zIndex = '-1';
  overlaydiv.style.opacity = '0.3';

  if (type == 'tv') {
   document.querySelector('#show-details').appendChild(overlaydiv)
  }
  else{
    document.querySelector('#movie-details').appendChild(overlaydiv)
  }
}


// display TV Details
async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];
  const show = await fetchAPIData(`tv/${showId}}`);

  // overlay for background image
  displayShowBackground('tv', show.backdrop_path);
  
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
      <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}</li>
      <li><span class="text-secondary">Next Episode To Air:</span> ${show.next_episode_to_air.name}</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${show.production_companies.map((company) => `<span>${company.name}</span>`).join(", ")}
    </div>
  </div>
  `;
  

  document.querySelector("#show-details").appendChild(div);
}

// Global Fetching From API DataBase
async function fetchAPIData(endpoint) {
  const API_KEY = "63b797eecf604f8d910938f3a5f3f2db";
  const API_URL = "https://api.themoviedb.org/3/";

  // show spinner before the request is made

  showSpinner();

  const res = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();

  hideSpinner(); // hide spinner after the request is made
  console.log(data);
  return data;
}

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

// INIT THE APP
function init() {
  switch (global.currentPage) {
    case "/":
      displayPopularMovies();
      break;

    case "/index":
      console.log("Home");
      break;

    case "/movie-details.html":
      displayMovieDetails();
      break;

    case "/tv-details.html":
      displayShowDetails()
      break;

    case "/shows.html":
      displayPopularShows();
      break;

    case "/search.html.html":
      console.log("Search  ");
      break;

    default:
      console.log("Page does not exist");
  }
}

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("DOMContentLoaded", highlightActiveLink);
// document.addEventListener("DOMContentLoaded", displayPopularMovies)
