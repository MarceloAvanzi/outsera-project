import Movie from "src/domain/entities/Movie";
import MoviePort from "src/domain/ports/MoviePort";

export default class MovieRepository implements MoviePort {
  private movies: Movie[] = [];
  constructor() { 
    this.movies = [
      {
        year: 1,
        title: "Movie 1",
        studios: '10',
        producers: 'a',
        winner: 'false',
      },
      {
        year: 2,
        title: "Movie 2",
        studios: '20th Century Fox',
        producers: 'c',
        winner: 'false',
      },
      {
        year: 3,
        title: "Movie 3",
        studios: '30',
        producers: 'b',
        winner: 'true',
      },
    ];
  }

  async create(movie: Movie): Promise<Movie> {
    this.movies.push(movie);
    return movie;
  }

  async findAll(): Promise<Movie[]> {
    return this.movies;
  }
}