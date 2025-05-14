import MovieWinnerInterval from "../../src/application/MovieWinnerInterval";
import MovieRepository from "../../src/infrastructure/database/MovieRepository";
import * as request from 'supertest';
import { AppModule } from "src/infrastructure/server/app.module";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from '@nestjs/testing';


describe('tests with real database instance', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  })
  
  afterAll(async () => {
    await app.close();
  });

  it('should return min and max winning intervals for producers', async () => {
    const movieRepository = new MovieRepository();
    const movieWinnerInterval = new MovieWinnerInterval(movieRepository);

    const res = await movieWinnerInterval.execute();

    expect(res).toEqual({
      min: [
        { producer: 'Joel Silver', interval: 1, previousWin: 1990, followingWin: 1991 },
      ],
      max: [
        { producer: 'Matthew Vaughn', interval: 13, previousWin: 2002, followingWin: 2015 },
      ],
    });
  })


  it('should return 200 and correct winner intervals', async () => {
    const res = await request(app.getHttpServer())
      .get('/movies/intervals')
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      min: [
        { producer: 'Joel Silver', interval: 1, previousWin: 1990, followingWin: 1991 },
      ],
      max: [
        { producer: 'Matthew Vaughn', interval: 13, previousWin: 2002, followingWin: 2015 },
      ],
    });
  });
})