import { Injectable } from '@nestjs/common';
import { IMovie } from './main';
import { faker } from '@faker-js/faker';

const makeFakeMovie = (): IMovie => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  genre: faker.music.genre(),
  previewImage: faker.internet.url(),
  previewVideoLink: faker.internet.url(),
});

const makeFakeMovies = (n: number) =>
  Array.from(Array(n))
    .fill(null)
    .map(() => makeFakeMovie());

@Injectable()
export class AppService {
  getFakeMovies(count: number = 10) {
    return makeFakeMovies(count);
  }
}
