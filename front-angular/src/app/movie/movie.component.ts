import { Component, Input } from '@angular/core';
import { IMovie } from "../app.component";



@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  @Input() movie: IMovie;
}
