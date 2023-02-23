import { Component } from '@angular/core';
import { Emojis } from '../../components/reaction/constants/emojiis';

import { ReactionsService } from 'src/app/services/reactions.service';
import { format } from 'date-fns';
import {
  IDayReactions,
  IReaction,
} from '../../store/reactions-timeline/reactions-timeline.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardPage {
  selectedEmoji: Emojis[] | null = null;
  selectedDateRange: Date[] = [];
  memoriesKeys: any[] = [];
  totalReactions: IDayReactions = {};
  expandedMemories: string[] = [];

  constructor(private reactionsService: ReactionsService) {}

  saveSelectedEmoji(emoji: Emojis | Emojis[]) {
    this.selectedEmoji = [...(emoji as Emojis[])];
  }

  expandInfo(id: string) {
    const isAlreadyExpanded = this.expandedMemories.includes(id);

    if (isAlreadyExpanded) {
      this.expandedMemories = this.expandedMemories.filter((_id) => _id !== id);
    } else {
      this.expandedMemories.push(id);
    }
  }

  isEmpty() {
    return this.memoriesKeys.length !== 0;
  }

  saveDateRange(dates: Date[]) {
    this.selectedDateRange = dates;
  }

  getMemoriesPerDate(date: string) {
    return this.totalReactions[date] as IReaction[];
  }

  getFormattedDate(date: string) {
    return format(new Date(date), 'dd LLL yyyy');
  }

  getHours(date: Date) {
    const dateFormat = 'HH:mm';
    return format(new Date(date), dateFormat);
  }

  getMemories() {
    if (!this.selectedEmoji) {
      return;
    }
    this.reactionsService
      .getAllReactionsByEmojiAndInterval(
        this.selectedEmoji,
        this.selectedDateRange
      )
      .subscribe((reactions) => {
        this.memoriesKeys = Object.keys(reactions).sort((p1, p2) =>
          p1 > p2 ? -1 : 1
        );
        this.totalReactions = reactions;
      });
  }
}
