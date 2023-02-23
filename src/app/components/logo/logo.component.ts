import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class Logo {
  @Input() mode: 'light' | 'dark' = 'dark';

  constructor() {}
}
