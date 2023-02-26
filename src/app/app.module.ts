import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import en from '@angular/common/locales/en';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Header } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardPage } from './pages/dashboard/dashboard.component';
import { HomePage } from './pages/home/home.component';
import { ReactionComponent } from './components/reaction/reaction.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ReactionsTimelineComponent } from './components/reactions-timeline/reactions-timeline.component';
import { SettingsPage } from './pages/settings/settings.component';
import { HistoryPage } from './pages/history/history.component';
import { SharedModule } from './shared/shared.module';
import { UILibraryModule } from './ui-library.module';
import { ReactionsPanelComponent } from './components/reactions-panel/reactions-panel.component';
import { Slider } from './components/slider/slider.component';
import { appReducer } from './store/app.reducer';
import { Drawer } from './components/drawer/drawer.component';
import { CircularProgress } from './components/circular-progress/circular-progress.component';
import { RangeSelector } from './components/range-selector/range-selector.component';
import { environment } from '../environments/environment';
import { AuthPage } from './pages/auth/auth.component';
import { AuthInterceptorService } from './pages/auth/auth.interceptor';
import { Logo } from './components/logo/logo.component';
import { LineChart } from './components/line-chart/line-chart.component';
import { ReactionsResolverService } from './services/reactions-resolver.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    Header,
    FooterComponent,
    DashboardPage,
    HomePage,
    ReactionComponent,
    NotFoundComponent,
    ModalComponent,
    ReactionsTimelineComponent,
    SettingsPage,
    HistoryPage,
    ReactionsPanelComponent,
    Slider,
    Drawer,
    RangeSelector,
    CircularProgress,
    AuthPage,
    Logo,
    LineChart,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    UILibraryModule,
    EmojiModule,
    StoreModule.forRoot(appReducer),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    NgApexchartsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    ReactionsResolverService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
