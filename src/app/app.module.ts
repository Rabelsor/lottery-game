import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BallSelectorComponent } from './components/ball-selector/ball-selector.component';
import { BetSplitComponent } from './components/bet-split/bet-split.component';
import { LotteryBallComponent } from './components/lottery-ball/lottery-ball.component';
import { LotteryBallsSelectionComponent } from './components/lottery-balls-selection/lottery-balls-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    BallSelectorComponent,
    BetSplitComponent,
    LotteryBallComponent,
    LotteryBallsSelectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
