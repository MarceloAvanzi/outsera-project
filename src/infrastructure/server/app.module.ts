import { Module } from '@nestjs/common';
import MovieController from '../controller/MovieController';
import MovieWinnerInterval from '../../application/MovieWinnerInterval';
import MovieRepository from '../database/MovieRepository';
import { MOVIE_DATA } from '../../domain/ports/MovieData';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [
    MovieWinnerInterval,
    {
      provide: MOVIE_DATA,
      useClass: MovieRepository,
    }
  ],
})
export class AppModule {}
