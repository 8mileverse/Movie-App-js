const global = {
    currentPage: window.location.pathname,
  };
  
  // Display Popular Movies
  async function displayPopularMovies() {
    const { results } = await fetchAPIData("movie/popular");
    //   loop through the results which has become an array of popular movies
  
    results.forEach((movie) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = ` 
     
        <a href="movie-details.html?id=${movie.id}">
          ${
  
              movie.poster_path ? `
  
               <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="Movie Title"
              /> 
              `  :  ` <img
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
  
  // Global Fetching From API DataBase
  async function fetchAPIData(endpoint) {
    const API_KEY = "63b797eecf604f8d910938f3a5f3f2db";
    const API_URL = "https://api.themoviedb.org/3/";
    const res = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();
  
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
  
  // INIT THE APP
  function init() {
    switch (global.currentPage) {
      case "/":
        displayPopularMovies();
        break;
  
      case "/index.html":
        console.log("Home");
        break;
  
      case "/movie-details.html":
        console.log("Movies");
        break;
  
      case "/tv--details.html":
        console.log("TV Shows");
        break;
  
      case "/shows.html":
        console.log(" Shows");
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
  