import { ChangeDetectorRef, Component } from '@angular/core';
import { ETestType, RenderService } from "../render.service";
import { AsyncPipe, NgClass, NgIf } from "@angular/common";
import { MAX_ITEMS_COUNT, MAX_TREE_DEEP } from "../../constants";

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgClass,
  ],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {
  constructor(public readonly renderService: RenderService, private readonly cdr: ChangeDetectorRef) {}

  public onItemsCountChange(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.renderService.itemsCount$.next(this.validate(value));
  }

  public onForceUpdate() {
    this.cdr.detectChanges();
  }

  private validate = (rawItemsCount: string) => {
    if (/^\d+$/.test(rawItemsCount)) {
      const count = Number.parseInt(rawItemsCount);

      if (this.renderService.testType$.value === ETestType.TREE && count > MAX_ITEMS_COUNT) {
        return MAX_ITEMS_COUNT;
      }

      if (count > MAX_ITEMS_COUNT) {
        return 5000;
      }

      return count;
    } else {
      return 1;
    }
  }

  protected readonly ETestType = ETestType;
  protected readonly MAX_TREE_DEEP = MAX_TREE_DEEP;
  protected readonly MAX_ITEMS_COUNT = MAX_ITEMS_COUNT;
}
