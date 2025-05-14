import { Inject } from "@nestjs/common";
import MovieData, { MOVIE_DATA } from "src/domain/ports/MovieData";

type Interval = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number
}

type MovieWinnerResponse = {
  min: Interval[];
  max: Interval[];
}

export default class MovieWinnerInterval {

  constructor(
    @Inject(MOVIE_DATA)
    readonly movieRepository: MovieData
  ) { }

  async execute(): Promise<MovieWinnerResponse> {
    const movies = await this.movieRepository.getWinners();
    if (!movies || movies.length === 0) throw new Error("No movies found");

    const intervals: Interval[] = [];
    const producersMap = new Map();

    for (const movie of movies) {
      const producers = movie.producers
        .replace(/\s+and\s+/g, ', ')
        .split(",")
        .map((producer) => producer.trim()).filter(Boolean);

      for (const producer of producers) {
        if (!producersMap.has(producer)) {
          producersMap.set(producer, []);
        }
        producersMap.get(producer)!.push(movie.year);
      }
    }

    for (const [producer, years] of producersMap.entries()) {
      if (years.length < 2) continue;

      const sortedYears = years.sort((a: number, b: number) => a - b);

      for (let i = 1; i < sortedYears.length; i++) {
        intervals.push({
          producer,
          interval: sortedYears[i] - sortedYears[i - 1],
          previousWin: sortedYears[i - 1],
          followingWin: sortedYears[i],
        });
      }
    }

    const maxInterval = Math.max(...intervals.map(i => i.interval));
    const minInterval = Math.min(...intervals.map(i => i.interval));

    return {
      min: intervals.filter(i => i.interval === minInterval),
      max: intervals.filter(i => i.interval === maxInterval),
    };
  }
}