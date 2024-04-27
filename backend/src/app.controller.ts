import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { IMovie } from './main';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/movies')
  getMovies(): IMovie[] {
    return this.appService.getFakeMovies();
  }

  @Get('/movies/:count')
  getMoviesByCount(@Param('count') count: string): IMovie[] {
    return this.appService.getFakeMovies(Number(count));
  }
}
