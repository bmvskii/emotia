import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.component';
import { DashboardPage } from './pages/dashboard/dashboard.component';
import { HistoryPage } from './pages/history/history.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthPage } from './pages/auth/auth.component';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardPage, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryPage, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthPage },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
