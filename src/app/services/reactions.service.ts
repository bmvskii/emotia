import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reaction } from '../components/reaction/reaction.model';
import { catchError, map } from 'rxjs';
import { isWithinInterval } from 'date-fns';
import { formatDate } from '../utils/index';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { selectReactions } from 'src/app/store/reactions-timeline/reactions-timeline.selector';
import { environment as env } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { Emojis } from '../components/reaction/constants/emojiis';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ReactionsService {
  reactions$ = this.store.pipe(select(selectReactions));

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  getAllReactions() {
    const userId = this.authService.getUserId();
    const url = `${env.API_URL}/${userId}/reactions.json`;
    return this.http.get(url).pipe(
      map((res) =>
        res
          ? Object.entries(res).map(([key, value]) => ({ id: key, ...value }))
          : null
      ),
      map((reactions) =>
        reactions
          ? reactions.reduce((acc, curr) => {
              const date = formatDate(curr.date);
              const monthData = acc[date];

              if (monthData) {
                monthData.push({ ...curr });
              } else {
                acc[date] = [{ ...curr }];
              }
              return acc;
            }, {})
          : {}
      ),
      catchError(() => this.authService.signOut())
    );
  }

  getAllReactionsByDay(date: string) {
    return this.reactions$.pipe(
      map((data) => {
        const values = Object.values(data);
        return values.length > 0 ? data[date] : [];
      })
    );
  }

  getAllReactionsByEmojiAndInterval(emojis: Emojis[], interval: Date[]) {
    const [startDate, endDate] = interval;
    return this.reactions$.pipe(
      map((reactions) => {
        return Object.entries(reactions)
          .map(([key, value]) => {
            const filteredValues = value
              .filter((entry) => emojis.includes(entry.emoji))
              .filter((entry) =>
                isWithinInterval(new Date(entry.date), {
                  start: new Date(startDate),
                  end: new Date(endDate),
                })
              );
            return {
              [key]: filteredValues,
            };
          })
          .filter((obj) => Object.values(obj).length !== 0)
          .reduce((acc, entry) => {
            const [values] = Object.values(entry);
            return {
              ...acc,
              ...(values.length !== 0 ? entry : {}),
            };
          }, {});
      })
    );
  }

  postReaction(reaction: Reaction) {
    const url = `${env.API_URL}/${this.authService.getUserId()}/reactions.json`;
    return this.http
      .post(url, reaction)
      .pipe(catchError(() => this.authService.signOut()));
  }
}
