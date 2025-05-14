import Movie from "../entities/Movie";

export const MOVIE_DATA = Symbol('MOVIE_DATA');

export default interface MovieData {
  create(movie: Movie): Promise<Movie>;
  getWinners(): Promise<Movie[]>;
}