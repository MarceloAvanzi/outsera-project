import Movie from "src/domain/entities/Movie";
import MovieData from "src/domain/ports/MovieData";
import SqliteConnection from "./SqliteConnection";

export default class MovieRepository implements MovieData {
  private db = SqliteConnection.getInstance();

  constructor() { }

  async create(movie: Movie): Promise<Movie> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO movies (year, title, studios, producers, winner)
         VALUES (?, ?, ?, ?, ?)`,
        [movie.year, movie.title, movie.studios, movie.producers, movie.winner],
        function (err) {
          if (err) return reject(err);
          resolve(movie);
        }
      );
    });
  }

  getWinners(): Promise<Movie[]> {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM movies WHERE winner = 'yes'", (err, rows) => {
        if (err) return reject(err);

        resolve(rows.map((row: Movie) => new Movie(
          row.year,
          row.title,
          row.studios,
          row.producers,
          row.winner 
        )));
      });
    });
  }
}