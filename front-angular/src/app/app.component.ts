import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieComponent } from "./movie/movie.component";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { ControlsComponent } from "./controls/controls.component";
import { ETestType, RenderService } from "./render.service";
import { MovieNodeComponent } from "./movie-node/movie-node.component";

export interface IMovie {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieComponent, NgForOf, ControlsComponent, AsyncPipe, NgIf, MovieNodeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-angular';

  constructor(private cdr: ChangeDetectorRef, public readonly renderService: RenderService) {}

  public render() {
    this.cdr.detectChanges();
  }

  protected readonly ETestType = ETestType;
}
