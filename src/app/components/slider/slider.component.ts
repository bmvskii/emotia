import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class Slider implements OnInit {
  min = 0;
  max = 10;
  mid = parseFloat(((this.max - this.min) / 2).toFixed(5));
  preHighLight = false;
  nextHighLight = false;
  _sliderValue = 0;

  @Output() sliderValueChanged = new EventEmitter<number>();

  set sliderValue(value: number) {
    this._sliderValue = value;
    this.highlightIcon();
    this.sliderValueChanged.emit(value);
  }

  get sliderValue(): number {
    return this._sliderValue;
  }

  ngOnInit(): void {
    this.sliderValue = 0;
  }

  highlightIcon(): void {
    const lower = this._sliderValue >= this.mid;
    this.preHighLight = !lower;
    this.nextHighLight = lower;
  }
}
