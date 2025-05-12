import Movie from "../entities/Movie";

export const MOVIE_PORT = Symbol('MOVIE_PORT');

export default interface MoviePort {
  create(movie: Movie): Promise<Movie>;
  findAll(): Promise<Movie[]>;
}