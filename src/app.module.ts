import { Module } from '@nestjs/common';
import MovieController from './infrastructure/controller/MovieController';
import MovieWinner from './application/MovieWinner';
import MovieRepository from './infrastructure/database/MovieRepository';
import { MOVIE_PORT } from './domain/ports/MoviePort';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [
    MovieWinner,
    {
      provide: MOVIE_PORT,
      useClass: MovieRepository,
    }
  ],
})
export class AppModule {}
