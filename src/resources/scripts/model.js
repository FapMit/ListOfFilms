import { v4 as uuidv4 } from "uuid";

export function createModel() {
  return {
    moviesIds: [],
    moviesById: {},

    addMovie: function ({ title }) {
      const movie = {
        id: uuidv4(),
        title,
        done: false,
      };

      this.moviesIds.push(movie.id);
      this.moviesById[movie.id] = movie;

      return movie;
    },

    setMovies: function (movies) {
      this.moviesIds = [];
      this.moviesById = {};

      movies.forEach((movie) => {
        this.moviesIds.push(movie.id);
        this.moviesById[movie.id] = movie;
      });
    },

    getMovies: function () {
      return {
        moviesById: this.moviesById,
        moviesIds: this.moviesIds,
      };
    },

    toggleMovie: function (id) {
      this.moviesById[id].done = !this.moviesById[id].done;
    },

    updateTitleMovie: function (id, title) {
      this.moviesById[id].title = title;
    },

    getMovie: function (id) {
      return this.moviesById[id];
    },

    deleteMovie: function (id) {
      delete this.moviesById[id];

      const deletedMovieId = this.moviesIds.indexOf(id);
      if (deletedMovieId !== -1) {
        this.moviesIds.splice(deletedMovieId, 1);
      }
    },
  };
}
