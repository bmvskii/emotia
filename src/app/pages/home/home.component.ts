import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Routine, Status } from './routine.model';
import { Store } from '@ngrx/store';
import { Emojis } from '../../components/reaction/constants/emojiis';
import { AddReaction } from 'src/app/store/reactions-timeline/reactions-timeline.reducer';
import { Reaction } from 'src/app/components/reaction/reaction.model';
import { ReactionsService } from 'src/app/services/reactions.service';
import { AppState } from 'src/app/store/app.reducer';
import {
  formatDate,
  getEnergyLevelLabel,
  getMoodLabel,
} from '../../utils/index';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePage {
  routines = [
    new Routine(Status.Completed, 'Routine name 1'),
    new Routine(Status.NotCompleted, 'Routine name 2'),
    new Routine(Status.Completed, 'Routine name 3'),
  ];
  averageMood: string = 'robot_face';
  averageEnergyLevel: number = 10;
  selectedEmoji: Emojis | Emojis[] | null = null;
  sliderValue: number = 0;

  @Input() description = '';
  @Input() title = '';
  @Output() deselectEmoji = new EventEmitter();

  constructor(
    private store: Store<AppState>,
    private reactionsService: ReactionsService,
    private messageService: NzMessageService
  ) {}

  saveSelectedEmoji(emoji: Emojis | Emojis[]) {
    this.selectedEmoji = emoji;
  }

  saveAvgEmoji(emoji: string) {
    this.averageMood = emoji;
  }

  saveSliderValue(value: number) {
    this.sliderValue = value;
  }

  getMoodLabel() {
    return getMoodLabel(this.averageMood);
  }

  getEnergyLevel() {
    return getEnergyLevelLabel(this.averageEnergyLevel);
  }

  async onAddToTimeline(e: MouseEvent): Promise<void> {
    e.preventDefault();
    if (!this.selectedEmoji) {
      return;
    }
    const now = new Date();
    const reaction = new Reaction(
      this.title,
      this.description,
      now,
      this.selectedEmoji as Emojis,
      this.sliderValue
    );
    await this.reactionsService.postReaction(reaction).subscribe((res: any) => {
      this.store.dispatch(
        AddReaction({
          date: formatDate(now),
          reaction,
          id: res.name,
        })
      );
      this.messageService.create(
        'success',
        `Reaction info wass successfully added.`
      );
    });
  }

  resetSelectedData() {
    this.description = '';
    this.deselectEmoji.emit();
  }
}
