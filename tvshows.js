const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_TVAPI =
  "https://api.themoviedb.org/3/search/tv?api_key=2edece655edef12e679ca5a34d9c6491&query=";

const POPULAR_TVSERIES =
  "https://api.themoviedb.org/3/discover/tv?api_key=2edece655edef12e679ca5a34d9c6491&sort_by=popularity.desc";

const popularTvSeries = async () => {
  const response = await fetch(POPULAR_TVSERIES);
  const series = await response.json();
  const popularElement = document.getElementById(
    "popular-tvseries-list-container"
  );
  showMovies(series, popularElement);
};

const showMovies = (movies, mainElement) => {
  const section = document.createElement("div");
  section.classList.add("movie-list");
  section.innerHTML = "";
  mainElement.appendChild(section);
  movies.results.forEach((movie) => {
    const { name, poster_path, overview, vote_average } = movie;
    const movieEl = document.createElement("div");
    movieEl.className = "movie";
    movieEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${name}">
    <h3 class="movie-list-item-title" >${name}</h3>
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

popularTvSeries();

const searchContent = async (searchUrl) => {
  const response = await fetch(searchUrl);
  const movies = await response.json();
  const searchList = document.getElementById("search-list");
  const container = document.getElementById("container");
  container.classList.add("hide");
  searchList.classList.add("search-movie-list");
  searchList.innerHTML = "";

  movies.results.forEach((movie) => {
    const { poster_path, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="trtrt">
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
    searchContent(SEARCH_TVAPI + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
