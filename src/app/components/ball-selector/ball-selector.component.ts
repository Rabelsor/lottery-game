import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Bet } from 'src/app/models/bet';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { LotteryBallsSelectionComponent } from '../lottery-balls-selection/lottery-balls-selection.component';

@Component({
  selector: 'ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit, OnDestroy {

  @ViewChild('lotteryBallsSelection', { static: false }) lotteryBallsSelection: LotteryBallsSelectionComponent;

  @Output() lotteryBallSelectedEvent: EventEmitter<number> = new EventEmitter<number>();



  private listOfBets: Bet[] = [];
  private totalBetAmmount: number = 0;

  public showResult: boolean = false;
  public winBet: Bet;
  public resultNumber: number;


  private announcedBetSubscription: Subscription;
  private announcedBetsSubscription: Subscription;
  private announcedPlaceBetsSubscription: Subscription;

  constructor(
    private communicatorService: CommunicatorService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.announcedBetSubscription = this.communicatorService.announcedBet$.subscribe(response => {
      this.registerNewBet(response);
    });
    this.announcedBetsSubscription = this.communicatorService.announcedBets$.subscribe(response => {
      if (!response) {
        this.listOfBets = [];
        this.totalBetAmmount = 0;
      }
    });
    this.announcedPlaceBetsSubscription = this.communicatorService.announcedPlaceBets$.subscribe(response => {
      if (response) {
        this.placeBets();
      }
    })
  }

  ngOnDestroy() {
    if(this.announcedBetSubscription) {
      this.announcedBetSubscription.unsubscribe();
    }
    if(this.announcedBetsSubscription) {
      this.announcedBetsSubscription.unsubscribe();
    }
    if(this.announcedPlaceBetsSubscription) {
      this.announcedPlaceBetsSubscription.unsubscribe();
    }
  }

  clearSelection() {
    this.lotteryBallsSelection.clearSelection();
    this.communicatorService.announceSelectBall(undefined);

  }

  lotteryBallSelected(event) {
    if (this.listOfBets.length < 8) {
      this.lotteryBallSelectedEvent.emit(event);
      this.communicatorService.announceSelectBall(event);
    } else {
      this.lotteryBallsSelection.lotteryBallSelected = undefined;
      this.lotteryBallsSelection.noMoreBallsWarning();
    }
  }

  registerNewBet(bet: Bet) {
    this.clearSelection();
    this.listOfBets.push(bet);
    this.totalBetAmmount += bet.ammount;
    this.communicatorService.announceTotalBet(this.totalBetAmmount);
    this.communicatorService.announceBets(this.listOfBets);
  }

  placeBets() {
    this.spinner.show();
    this.resultNumber = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    this.listOfBets.forEach(element => {
      if (element.ball === this.resultNumber) {
        this.winBet = new Bet(element.ball, element.ammount * 1.5);
      }
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.showResult = true;
      this.spinner.hide();
    }, 3000);
  }

  resetGame() {
    this.showResult = false;
    this.winBet = undefined;
    this.resultNumber = undefined;
    this.communicatorService.announceTotalBet(0);
    this.communicatorService.announceBets(null);
  }

}
