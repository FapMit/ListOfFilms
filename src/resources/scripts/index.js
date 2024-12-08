import { MOVIELIST_STORAGE_KEY } from "./constants";
import { createModel } from "./model";
import { createStorage } from "./storage";
import { createView } from "./view";

import { animationBtnNode } from "./animations";

const model = createModel();
const view = createView(
  ".js-movies-output",
  _handleClickMovieDone,
  _handleClickMovieRedact,
  _handleClickMovieDelete
);
const storage = createStorage(MOVIELIST_STORAGE_KEY);

const inputNode = document.querySelector(".js-movies-input");
const btnNode = document.querySelector(".js-movies-btn");

view.renderPreloader();

storage.pull().then((movies) => {
  if (!movies.length == 0) {
    view.deletePreloader();
    model.setMovies(movies);
    view.renderMovies(model.getMovies());
    view.renderCounter(model.getMovies());
  } else {
    view.deletePreloader();
    view.renderMessage();
  }
});

btnNode.addEventListener("click", (e) => {
  if (!inputNode.value) return;

  if (model.getMovies().moviesIds.length == 0) {
    view.clearMoviesList();
  }

  const movieTitle = inputNode.value;

  const movie = model.addMovie({
    title: movieTitle,
  });

  view.addMovie(movie);
  storage.push(movie);

  view.clearCounter();
  view.renderCounter(model.getMovies());

  animationBtnNode(e);
});

function _handleClickMovieDone(id) {
  model.toggleMovie(id);

  storage.update(model.getMovie(id));

  view.clearCounter();
  view.renderCounter(model.getMovies());

  view.clearMoviesList();
  view.renderMovies(model.getMovies());
}

function _handleClickMovieRedact(id, title) {
  model.updateTitleMovie(id, title);
  storage.update(model.getMovie(id));
}

function _handleClickMovieDelete(id) {
  storage.deleteMovie(id);
  model.deleteMovie(id);

  if (model.getMovies().moviesIds.length != 0) {
    view.clearMoviesList();
    view.renderMovies(model.getMovies());
    view.clearCounter();
    view.renderCounter(model.getMovies());
  } else {
    view.clearMoviesList();
    view.clearCounter();
    view.renderMessage();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 13 && e.target.classList.contains("js-movies-input")) {
    btnNode.click();
  }
  if (
    e.keyCode === 13 &&
    e.target.classList.contains("movies__item-text--redacted")
  ) {
    e.target.nextElementSibling.click();
  }
});
