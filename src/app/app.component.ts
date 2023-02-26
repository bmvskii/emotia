import { Component, OnInit } from '@angular/core';
import { ReactionsService } from './services/reactions.service';
import { AppState } from './store/app.reducer';
import { AddReactions } from 'src/app/store/reactions-timeline/reactions-timeline.actions';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { selectAuthStatus } from './store/auth/auth.selector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Emotia';
  isAuthenticated$ = this.store.pipe(select(selectAuthStatus));

  constructor(
    private reactionsService: ReactionsService,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((status) => {
      if (status) {
        this.fetchAllReactions();
      } else {
        this.router.navigate(['/auth'], { relativeTo: this.route });
      }
    });
  }

  async fetchAllReactions() {
    await this.reactionsService.getAllReactions().subscribe((reactions) => {
      this.store.dispatch(AddReactions({ reactions }));
    });
  }
}
