import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import MovieWinnerInterval from 'src/application/MovieWinnerInterval';

@Controller('movies')
export default class MovieController {
  constructor(private readonly movieWinnerInterval: MovieWinnerInterval) {}

  @Get('intervals')
  async getMovieWinnerInterval() {
    try {
      const movies = await this.movieWinnerInterval.execute();
       
      return movies;
    } catch (error) {
      throw new HttpException(`Failed to fetch movies: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}