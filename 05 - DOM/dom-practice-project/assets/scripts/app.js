const backdrop = document.getElementById("backdrop");
const addModal = document.getElementById("add-modal");
const deleteModal = document.getElementById("delete-modal");
const addMovieBtnHeader = document.querySelector("header button");
const confirmAddModalBtn = addModal.querySelector(".btn--success");
const cancelAddModalBtn = addModal.querySelector(".btn--passive");
const confirmDeleteModalBtn = deleteModal.querySelector(".btn--danger");
const cancelDeleteModalBtn = deleteModal.querySelector(".btn--passive");
const inputTitle = document.getElementById("title");
const inputImgUrl = document.getElementById("image-url");
const inputRating = document.getElementById("rating");
const movieList = document.getElementById("movie-list");
const entryTextSection = document.getElementById("entry-text");

let movies = [];
let toBeDeletedIndex;

const clearInputs = () => {
  inputTitle.value = "";
  inputImgUrl.value = "";
  inputRating.value = "";
};

const showAddModal = () => {
  addModal.classList.add("visible");
  backdrop.classList.add("visible");
};

const showDeleteModal = () => {
  deleteModal.classList.add("visible");
  backdrop.classList.add("visible");
};

const hideModal = () => {
  clearInputs();
  addModal.classList.remove("visible");
  deleteModal.classList.remove("visible");
  backdrop.classList.remove("visible");
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>`;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  movieList.appendChild(newMovieElement);
};

const addMovie = () => {
  const titleValue = inputTitle.value;
  const imageUrlValue = inputImgUrl.value;
  const ratingValue = inputRating.value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    ratingValue < 1 ||
    ratingValue > 5
  ) {
    alert("Please enter valid input (rating between 1 and 5).");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    imageUrl: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);

  hideModal();
  updateUI();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.imageUrl,
    newMovie.rating
  );
};

const deleteMovie = () => {
  movies.splice(toBeDeletedIndex, 1);
  movieList.removeChild(movieList.children[toBeDeletedIndex]);
  updateUI();
  hideModal();
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  toBeDeletedIndex = movieIndex;
  showDeleteModal();
};

addMovieBtnHeader.addEventListener("click", showAddModal);
backdrop.addEventListener("click", hideModal);
confirmAddModalBtn.addEventListener("click", addMovie);
cancelAddModalBtn.addEventListener("click", hideModal);
confirmDeleteModalBtn.addEventListener("click", deleteMovie);
cancelDeleteModalBtn.addEventListener("click", hideModal);
