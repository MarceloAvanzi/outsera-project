import MovieWinnerInterval from "../../src/application/MovieWinnerInterval";
import MovieData from "../../src/domain/ports/MovieData";
import Movie from "../../src/domain/entities/Movie";

describe('tests with mock data', () => {
  let movieRepositoryMock: jest.Mocked<MovieData>;
  let movieWinnerInterval: MovieWinnerInterval;

  beforeEach(() => {
    movieRepositoryMock = {
      create: jest.fn(),
      getWinners: jest.fn(),
    };
    movieWinnerInterval = new MovieWinnerInterval(movieRepositoryMock);
  });

  it('should return min and max winning intervals for producers', async () => {
    const mockMovies: Movie[] = [
      new Movie(1990, 'Movie A', 'Studio A', 'Joel Silver', 'yes'),
      new Movie(1991, 'Movie B', 'Studio B', 'Joel Silver', 'yes'),
      new Movie(2002, 'Movie C', 'Studio C', 'Matthew Vaughn', 'yes'),
      new Movie(2015, 'Movie D', 'Studio D', 'Matthew Vaughn', 'yes'),
    ];

    movieRepositoryMock.getWinners.mockResolvedValue(mockMovies);

    const res = await movieWinnerInterval.execute();

    expect(res).toEqual({
      min: [
        { producer: 'Joel Silver', interval: 1, previousWin: 1990, followingWin: 1991 },
      ],
      max: [
        { producer: 'Matthew Vaughn', interval: 13, previousWin: 2002, followingWin: 2015 },
      ],
    });
  });

  it('should throw an error if no movies are found', async () => {
    movieRepositoryMock.getWinners.mockResolvedValue([]);

    await expect(movieWinnerInterval.execute()).rejects.toThrow('No movies found');
  });

  it('should handle producers with only one win', async () => {
    const mockMovies: Movie[] = [
      new Movie(1990, 'Movie A', 'Studio A', 'Single Producer', 'yes'),
    ];

    movieRepositoryMock.getWinners.mockResolvedValue(mockMovies);

    const res = await movieWinnerInterval.execute();

    expect(res).toEqual({
      min: [],
      max: [],
    });
  });
});