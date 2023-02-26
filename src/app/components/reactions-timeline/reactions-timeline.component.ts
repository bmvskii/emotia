import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReactionsService } from '../../services/reactions.service';
import { format } from 'date-fns';
import { formatDate, getAverageMood } from '../../utils/index';
import { Emojis } from '../reaction/constants/emojiis';

@Component({
  selector: 'app-reactions-timeline',
  templateUrl: './reactions-timeline.component.html',
  styleUrls: ['./reactions-timeline.component.scss'],
})
export class ReactionsTimelineComponent implements OnInit {
  reactions: any = [];
  @Output() averageEmojiCalculated = new EventEmitter<string>();
  @Input() compact = false;
  @Input() date: string = formatDate(new Date());

  constructor(private reactionsService: ReactionsService) {}

  getHours(date: Date) {
    const dateFormat = 'HH:mm';
    return format(new Date(date), dateFormat);
  }

  isEmpty() {
    return this.reactions.length === 0;
  }

  calculateAverageEmoji(emojis: Emojis[]) {
    const defaultMood = 'robot_face';
    const avgMood = getAverageMood(emojis) || defaultMood;
    this.averageEmojiCalculated.emit(avgMood);
  }

  getCurrentTimelineData() {
    this.reactionsService.getAllReactionsByDay(this.date).subscribe((data) => {
      this.reactions = data || [];
      const emojis = this.reactions.map((r: any) => r.emoji);
      this.calculateAverageEmoji(emojis);
    });
  }

  ngOnInit(): void {
    this.getCurrentTimelineData();
  }
}
