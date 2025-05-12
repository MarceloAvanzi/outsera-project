import { Controller, Get } from "@nestjs/common";
import MovieWinner from "src/application/MovieWinner";

@Controller('movie')
export default class MovieController {
  constructor(readonly movieWinner: MovieWinner){}

  @Get()
  async getMovieWinner() {
    const movies = await this.movieWinner.execute();
    return movies;
  }

}