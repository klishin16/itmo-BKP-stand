import { Component, Input } from '@angular/core';
import { NgIf } from "@angular/common";
import { IMovie } from "../app.component";

@Component({
  selector: 'app-movie-node',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './movie-node.component.html',
  styleUrl: './movie-node.component.css'
})
export class MovieNodeComponent {
  @Input() movie: IMovie;

  @Input() currentDeep: number;
  @Input() targetDeep: number;
}
