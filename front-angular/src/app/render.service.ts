import { ChangeDetectorRef, Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatestWith, ReplaySubject } from "rxjs";
import { BACKEND_URL, LOAD_MOVIES_COUNT } from "../constants";
import { IMovie } from "./app.component";

export enum ETestType {
  STATIC,
  LIST,
  TREE
}

@Injectable({ providedIn: 'root' })
export class RenderService {
  public testType$ = new BehaviorSubject<ETestType>(ETestType.STATIC);

  public isShow$ = new BehaviorSubject<boolean>(true)

  public loadedMoviesList$ = new ReplaySubject<IMovie[]>(1);
  public moviesList$ = new ReplaySubject<IMovie[]>(1);

  public itemsCount$ = new BehaviorSubject<number>(7);

  constructor() {
    this.loadedMoviesList$.pipe(combineLatestWith(this.itemsCount$)).subscribe(([loadedMovies, items_count]) => {
      this.moviesList$.next(Array.from(Array(items_count), (_, index) => loadedMovies[index % LOAD_MOVIES_COUNT]))
    })

    fetch(`${BACKEND_URL}/movies/${LOAD_MOVIES_COUNT}`)
      .then(response => response.json())
      .then(data => this.loadedMoviesList$.next(data))

    this.moviesList$.subscribe(v => {
      console.log('v', v)
    })

    this.loadedMoviesList$.subscribe(v => {
      console.log('loadedMoviesList$', v)
    })
  }

  public onToggleShow() {
    this.isShow$.next(!this.isShow$.value)
  }

  public onSwitchTest(testType: ETestType) {
    this.testType$.next(testType);
  }
}
