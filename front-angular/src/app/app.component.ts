import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieComponent } from "./movie/movie.component";
import { NgForOf } from "@angular/common";

export interface IMovie {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
}

const BACKEND_URL = 'http://backend.local.dev';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'front-angular';

  n = 128;
  public moviesList: IMovie[] = []

  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    fetch(`${BACKEND_URL}/movies/${this.n}`)
      .then(response => response.json())
      .then(data => this.moviesList = data)
  }

  public render() {
    this.cdr.detectChanges();
  }
}
