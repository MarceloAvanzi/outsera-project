import { Inject } from "@nestjs/common";
import Movie from "src/domain/entities/Movie";
import MoviePort, { MOVIE_PORT } from "src/domain/ports/MoviePort";

export default class MovieWinner {

  constructor(
    @Inject(MOVIE_PORT)
    readonly movieRepository: MoviePort
  ) { }

  async execute(): Promise<Movie[]> {
    const movies = await this.movieRepository.findAll();
    // const winner = movies.reduce((prev, current) => (prev.votes > current.votes) ? prev : current);
    return movies;
  }
}