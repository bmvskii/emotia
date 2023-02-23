import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Emojis, EmojiWeights } from '../reaction/constants/emojiis';

@Component({
  selector: 'reactions-panel',
  templateUrl: './reactions-panel.component.html',
  styleUrls: ['./reactions-panel.component.scss'],
})
export class ReactionsPanelComponent implements OnInit {
  selectedEmoji: Emojis | Emojis[] | null = null;
  reactions: Emojis[] = [...(Object.keys(EmojiWeights) as Emojis[])];

  @Input() allowMultipleSelect = false;
  @Output() onEmojiSelect = new EventEmitter<Emojis | Emojis[]>();

  constructor() {}

  onClear() {
    this.selectedEmoji = this.allowMultipleSelect ? [] : null;
  }

  isSelected(emoji: Emojis) {
    return this.allowMultipleSelect
      ? this.selectedEmoji?.includes(emoji)
      : this.selectedEmoji === emoji;
  }

  onHandleSelect(idx: number): void {
    if (this.allowMultipleSelect && Array.isArray(this.selectedEmoji)) {
      const hasAlreadySelected = this.selectedEmoji.find(
        (el) => el === this.reactions[idx]
      );

      if (hasAlreadySelected) {
        this.selectedEmoji = this.selectedEmoji.filter(
          (el) => el !== this.reactions[idx]
        );
      } else {
        this.selectedEmoji.push(this.reactions[idx]);
      }
    } else {
      this.selectedEmoji = this.reactions[idx];
    }

    this.onEmojiSelect.emit(this.selectedEmoji);
  }

  ngOnInit(): void {
    if (this.allowMultipleSelect) {
      this.selectedEmoji = [];
    }
  }
}
