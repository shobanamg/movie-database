const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=2edece655edef12e679ca5a34d9c6491&query=";

const POPULAR_MOVIES =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2edece655edef12e679ca5a34d9c6491";

const HIGHEST_RATEDMOVIES =
  "https://api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&api_key=2edece655edef12e679ca5a34d9c6491";

const KIDS_MOVIES =
  "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=2edece655edef12e679ca5a34d9c6491";

const kidsMovies = async () => {
  const response = await fetch(KIDS_MOVIES);
  const movies = await response.json();
  const kidsElement = document.getElementById("kids-movies-list-container");

  showMovies(movies, kidsElement);
};

const popularMovies = async () => {
  const response = await fetch(POPULAR_MOVIES);
  const movies = await response.json();
  const popularElement = document.getElementById(
    "popular-movie-list-container"
  );
  showMovies(movies, popularElement);
};

const highestRatedMovies = async () => {
  const response = await fetch(HIGHEST_RATEDMOVIES);
  const movies = await response.json();
  const highestRatedElement = document.getElementById(
    "high-rated-movie-list-container"
  );

  showMovies(movies, highestRatedElement);
};

const showMovies = (movies, mainElement) => {
  const section = document.createElement("div");
  section.classList.add("movie-list");
  section.innerHTML = "";
  mainElement.appendChild(section);
  movies.results.forEach((movie) => {
    const { title, poster_path, vote_average } = movie;
    const movieEl = document.createElement("div");
    movieEl.className = "movie";
    movieEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}">
    <h3 class="movie-list-item-title" >${title}</h3>
    <h3 class="movie-list-item-vote">${vote_average}</h3>
    <button class="movie-list-item-button">Watch</button>`;
    section.appendChild(movieEl);
  });

  const arrow = document.createElement("div");
  arrow.classList.add("arrow");
  arrow.innerHTML = `<i class="fas fa-chevron-right arrow"></i>`;
  mainElement.appendChild(arrow);

  const itemNumber = section.querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      section.style.transform = `translateX(${
        section.computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      section.style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
};

popularMovies();
highestRatedMovies();
kidsMovies();

const searchContent = async (searchUrl) => {
  const response = await fetch(searchUrl);
  const movies = await response.json();
  const searchList = document.getElementById("search-list");
  const container = document.getElementById("container");
  container.classList.add("hide");
  searchList.classList.add("search-movie-list");
  searchList.innerHTML = "";

  movies.results.forEach((movie) => {
    const { title, poster_path, vote_average } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="trtrt">
            <h3 class="movie-list-item-title" >${title}</h3>
            <h3 class="movie-list-item-vote">${vote_average}</h3>
            <button class="movie-list-item-button">Watch</button>`;
    searchList.appendChild(movieEl);
  });
};

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  "#container,.navbar,.navbar-container,.menu-list,.movie-list-container h1,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

const form = document.getElementById("form");
const search = document.getElementById("search");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    searchContent(SEARCH_API + searchTerm);
    console.log(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
