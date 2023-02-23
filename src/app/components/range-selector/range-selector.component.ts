import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss'],
})
export class RangeSelector {
  date = null;
  @Output() dateRangeChanged = new EventEmitter<Date[]>();

  constructor() {}

  onChange(dates: Date[]): void {
    this.dateRangeChanged.emit(dates);
  }
}
