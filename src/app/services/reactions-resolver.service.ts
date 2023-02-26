import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ReactionsService } from './reactions.service';

@Injectable()
export class ReactionsResolverService implements Resolve<any> {
  constructor(private reactionsService: ReactionsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return true;
  }
}
