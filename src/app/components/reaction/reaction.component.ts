import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.scss'],
})
export class ReactionComponent implements OnInit {
  @Input('emoji') emojiName = 'stuck_out_tongue';
  @Input() size = 30;

  constructor() {}

  ngOnInit(): void {}
}
