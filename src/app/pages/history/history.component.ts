import { Component } from '@angular/core';
import { ReactionsService } from 'src/app/services/reactions.service';
import { IReaction } from 'src/app/store/reactions-timeline/reactions-timeline.selector';
import { formatDate } from '../../utils/index';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryPage {
  reactions: IReaction[] = [];
  activeDate: string | null = null;
  isDrawerVisible: boolean = false;

  constructor(private reactionsService: ReactionsService) {}

  closeDrawer() {
    this.isDrawerVisible = false;
  }

  onValueChange(value: Date): void {
    this.activeDate = formatDate(value);
    this.isDrawerVisible = true;
  }

  getDayInfo(date: Date) {
    const formattedDate = formatDate(date);
    return this.reactionsService
      .getAllReactionsByDay(formattedDate)
      .pipe(tap((date) => date));
  }

  ngOnInit(): void {}

  onPanelChange(change: { date: Date; mode: string }): void {}

  getMonthData(date: Date): number | null {
    return null;
  }
}
