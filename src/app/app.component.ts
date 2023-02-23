import { Component, OnInit } from '@angular/core';
import { ReactionsService } from './services/reactions.service';
import { AppState } from './store/app.reducer';
import {
  AddReaction,
  AddReactions,
} from 'src/app/store/reactions-timeline/reactions-timeline.reducer';
import { Reaction } from 'src/app/components/reaction/reaction.model';
import { format } from 'date-fns';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mood-tracker-app';

  constructor(
    private reactionsService: ReactionsService,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.authService.isAuthenticated) {
      await this.fetchAllReactions();
    } else {
      this.router.navigate(['/auth'], { relativeTo: this.route });
    }
  }

  async fetchAllReactions() {
    await this.reactionsService.getAllReactions().subscribe((reactions) => {
      this.store.dispatch(AddReactions({ reactions }));
    });
  }
}
