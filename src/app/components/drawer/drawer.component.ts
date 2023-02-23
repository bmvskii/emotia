import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ReactionsService } from 'src/app/services/reactions.service';
import {
  getAverageMood,
  getEnergyLevelLabel,
  getMoodLabel,
} from 'src/app/utils';
import { format } from 'date-fns';

@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class Drawer implements OnInit {
  @Input() date: string = new Date().toString();
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter();

  averageMood: string = 'robot_face';
  dayData: any = {};

  constructor(private reactionsService: ReactionsService) {}

  getFormattedDate(date: string) {
    return format(new Date(date), 'dd LLL yyyy');
  }

  getData(date: string) {
    this.reactionsService.getAllReactionsByDay(date).subscribe((data) => {
      this.dayData = data;
    });
  }

  ngOnInit(): void {
    this.getData(this.date);
  }

  getMoodLabel() {
    const defaultMood = 'robot_face';
    const emojis = this.dayData.map((data: any) => data.emoji);
    this.averageMood = getAverageMood(emojis) || defaultMood;
    return getMoodLabel(this.averageMood);
  }

  getEnergyLevel() {
    const avgLevel = this.dayData.reduce(
      (acc: any, curr: any, idx: any, arr: any) =>
        arr.length - 1 == idx
          ? Math.round((acc + curr.emoji) / arr.length)
          : curr + acc,
      0
    );
    return getEnergyLevelLabel(avgLevel);
  }

  close(): void {
    this.isVisible = false;
    this.onClose.emit(true);
  }
}
