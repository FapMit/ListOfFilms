import {
  BTN_DELETE_SVG,
  BTN_REDACT_SVG,
  BTN_SUCCESS_SVG,
  PRELOADER_TEXT,
} from "./constants";

export function createView(
  selector,
  onClickMovieDone,
  onClickMovieRedact,
  onClickMovieDelete
) {
  const outputNode = document.querySelector(selector);
  const counterNode = document.querySelector(".movies__settings-counter");
  const bodyNode = document.querySelector("body");

  return {
    outputNode,

    renderMovies: function ({ moviesIds, moviesById }) {
      moviesIds.forEach((id) => {
        this.addMovie(moviesById[id]);
      });
    },

    renderMessage: function () {
      const li = document.createElement("li");
      li.className = "movies__list-item movies__list-item--message";

      const p = document.createElement("p");
      p.className = "movies__item-text";
      p.textContent = "Список фильмов пуст...";

      li.append(p);

      this.outputNode.append(li);
    },

    renderCounter: function (movies) {
      const spanViewed = document.createElement("span");

      let countViewed = 0;

      const allMoviesInfo = movies.moviesById;

      for (let movie in allMoviesInfo) {
        if (allMoviesInfo[movie].done) countViewed++;
      }

      spanViewed.textContent = countViewed;

      const spanCountMovies = document.createElement("span");
      spanCountMovies.textContent = movies.moviesIds.length;

      counterNode.append("Просмотрено: ", spanViewed, " / ", spanCountMovies);
    },

    renderPreloader: function () {
      const preloader = document.createElement("div");
      preloader.classList.add("preloader");

      const preloaderInner = document.createElement("div");
      preloaderInner.classList.add("preloader__inner");

      PRELOADER_TEXT.forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style = `--i: ${index + 1}`;
        preloaderInner.append(span);
      });

      preloader.append(preloaderInner);

      bodyNode.append(preloader);
    },

    deletePreloader: function () {
      const preloader = document.querySelector(".preloader");

      setTimeout(() => {
        preloader.classList.add("preloader--hidden");
      }, 3000);

      setTimeout(() => {
        preloader.remove();
      }, 5000);
    },

    clearCounter: function () {
      counterNode.innerHTML = ``;
    },

    clearMoviesList: function () {
      this.outputNode.innerHTML = ``;
    },

    addMovie: function (movie) {
      const li = document.createElement("li");
      li.className = "movies__list-item";

      const labelCheckbox = document.createElement("label");
      labelCheckbox.className = "checkbox";

      const inputCheckbox = document.createElement("input");
      inputCheckbox.setAttribute("type", "checkbox");
      inputCheckbox.setAttribute("name", movie.title);
      inputCheckbox.setAttribute("id", movie.id);

      const spanCheckbox = document.createElement("span");
      spanCheckbox.className = "checkmark";

      labelCheckbox.appendChild(inputCheckbox);
      labelCheckbox.appendChild(spanCheckbox);

      inputCheckbox.onclick = () => {
        onClickMovieDone(movie.id);
      };

      const titleInput = document.createElement("input");
      titleInput.setAttribute("type", "text");
      titleInput.className = "movies__item-text";
      titleInput.value = movie.title;
      titleInput.disabled = true;

      const btnRedactMovie = document.createElement("button");
      btnRedactMovie.innerHTML = BTN_REDACT_SVG;

      btnRedactMovie.setAttribute("type", "button");
      btnRedactMovie.classList = "movie__item-btn movie__item-btn--redact";

      btnRedactMovie.onclick = () => {
        if (titleInput.disabled) {
          const allMoviesNodes =
            document.querySelectorAll(".movies__list-item");
          allMoviesNodes.forEach((node) => {
            const cardInputNode = node.childNodes[1];
            const btnRedact = node.childNodes[2];
            cardInputNode.disabled = true;
            cardInputNode.classList.remove("movies__item-text--redacted");
            btnRedact.innerHTML = BTN_REDACT_SVG;
          });
          btnRedactMovie.innerHTML = BTN_SUCCESS_SVG;
          titleInput.disabled = false;
          titleInput.focus();
          titleInput.classList.add("movies__item-text--redacted");
        } else {
          onClickMovieRedact(movie.id, titleInput.value);
          btnRedactMovie.innerHTML = BTN_REDACT_SVG;
          titleInput.disabled = true;
          titleInput.classList.remove("movies__item-text--redacted");
        }
      };

      const btnDeleteMovie = document.createElement("button");
      btnDeleteMovie.innerHTML = BTN_DELETE_SVG;
      btnDeleteMovie.setAttribute("type", "button");
      btnDeleteMovie.classList = "movie__item-btn movie__item-btn--delete";

      btnDeleteMovie.onclick = () => {
        btnDeleteMovie.classList.add("movie__item-btn--delete-animate");
        setTimeout(() => {
          onClickMovieDelete(movie.id);
        }, 1000);
      };

      if (movie.done) {
        inputCheckbox.setAttribute("checked", "");
        btnRedactMovie.setAttribute("disabled", "");
        btnDeleteMovie.setAttribute("disabled", "");
      }

      li.append(labelCheckbox, titleInput, btnRedactMovie, btnDeleteMovie);

      this.outputNode.append(li);
    },
  };
}
