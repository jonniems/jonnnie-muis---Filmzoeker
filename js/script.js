const movieList = document.querySelector('#movie-list');

//Create a list of li's (with image and link within) and add each item to 'ul' movie-list
const addMoviesToDom = (films) => {
    const arr = films.map(function (movie) {
        const imdbLink = "https://www.imdb.com/title/" + movie.imdbID;
        return "<li class='movie-list-item'><a href=" + imdbLink + " target='_blank'><img src=" + movie.Poster + "><p>" + movie.Title + "</p></a></li>"
    });
    arr.forEach(function (movie) {
        movieList.innerHTML += movie
    });
};

//Put all li's to the DOM when page is opened or refreshed
addMoviesToDom(movies);

//Add EvenListeners to make sure something happens when you use the radio buttons and the search form
const addEventListeners = () => {
    const radioBtn = document.querySelectorAll("input[name='film-filter']");
    radioBtn.forEach(function (radio) {
        radio.addEventListener('change', function (event) {
            handleOnChangeEvent(event.target.value);
        });
    });
    const searchForm = document.querySelector("#search-form");
    const searchInput = document.querySelector("#search-input");
    searchForm.addEventListener('submit', function (event) {
        let filteredMovies = searchInput.value.toLowerCase();
        searchMovies(filteredMovies);
        event.preventDefault();
    });
};
addEventListeners();

//Fire functions depending on selected radio button
const handleOnChangeEvent = (filterOn) => {
    switch (filterOn) {
        case 'all-filter': filterAllMovies(movies);
            break;
        case 'new-filter': filterLatestMovies();
            break;
        case 'avengers-filter': filterSelectedMovies("Avengers");
            break;
        case 'xmen-filter': filterSelectedMovies("X-Men");
            break;
        case 'princess-filter': filterSelectedMovies("Princess");
            break;
        case 'batman-filter': filterSelectedMovies("Batman");
            break;
    };
};

//Filter for All Movies
const filterAllMovies = () => {
    clearList();
    addMoviesToDom(movies);
};

//Filter on New Movies (2014 and newer)
const filterLatestMovies = () => {
    const resultLatestMovies = movies.filter(function (movie) {
        return parseInt(movie.Year) >= 2014;
    });
    clearList();
    addMoviesToDom(resultLatestMovies);
};

//Filter on Superheroes
const filterSelectedMovies = (superhero) => {
    const resultSelectedMovies = movies.filter(function (movie) {
        return movie.Title.includes(superhero)
    });
    clearList();
    addMoviesToDom(resultSelectedMovies);
};

//Filter on Search term (and "No results")
const searchMovies = (searchWord) => {
    const resultSearchMovies = movies.filter(function (movie) {
        return movie.Title.toLowerCase().includes(searchWord)
    });
    if (resultSearchMovies.length < 1 || searchWord == "") {
        alert("Er zijn geen films gevonden met \"" + searchWord + "\" in de titel.");
    } else {
        clearList();
        addMoviesToDom(resultSearchMovies);
    }
};

//Clear all li's to make room for a new selection
const clearList = () => {
    const movieListItems = document.querySelectorAll("#movie-list>li");
    movieListItems.forEach(movie => movie.remove());
};