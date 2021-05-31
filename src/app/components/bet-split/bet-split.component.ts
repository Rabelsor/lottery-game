import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Bet } from 'src/app/models/bet';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';


@Component({
  selector: 'bet-split',
  templateUrl: './bet-split.component.html',
  animations: [
    trigger('queryAnimation', [
      transition('* => goAnimate', [
        // hide the inner elements
        query('div', style({ opacity: 0 })),

        // animate the inner elements in, one by one
        query('div', animate(1000, style({ opacity: 1 }))),
      ])
    ])
  ],
  styleUrls: ['./bet-split.component.scss']
})
export class BetSplitComponent implements OnInit, OnDestroy {

  @ViewChild('scrollLottery', { static: false }) scrollLottery: ElementRef;

  private scrollContainer: any;

  public lotteryBallsBet: number[] = [];
  public ballSelectToBet: number;
  public totalAmmountDisplay: number = 0;
  public stack: number = 0;

  public noBall: boolean = false;
  public minAmmount: boolean = false;
  public noBets: boolean = false;
  public betMade: boolean = false;

  public betForm: FormGroup;

  private announcedSelectBallSubscription: Subscription;
  private announcedTotalBetSubscription: Subscription;
  private announcedBetsSubscription: Subscription;

  constructor(
    private communicatorService: CommunicatorService,
    private formBuild: FormBuilder) { }

  ngOnInit(): void {

    this.betForm = this.formBuild.group({
      bet: new FormControl(null, Validators.required)
    })

    this.communicatorService.announcedSelectBall$.subscribe(response => {
      this.scrollToBottom();
      if (response) {
        this.ballSelectToBet = response;
        this.lotteryBallsBet.push(this.ballSelectToBet);
      } else if (this.ballSelectToBet) {
        this.lotteryBallsBet.pop();
        this.ballSelectToBet = undefined;
      }
    });

    this.communicatorService.announcedTotalBet$.subscribe(response => {
      this.totalAmmountDisplay = response;
      if(this.totalAmmountDisplay === 0) {
        this.betMade = false;
      }
    });

    this.communicatorService.announcedBets$.subscribe(response => {
      this.lotteryBallsBet = [];
      if (response) {
        response.forEach(element => {
          this.lotteryBallsBet.push(element.ball);
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.announcedSelectBallSubscription) {
      this.announcedSelectBallSubscription.unsubscribe();
    }
    if (this.announcedTotalBetSubscription) {
      this.announcedTotalBetSubscription.unsubscribe();
    }
    if (this.announcedBetsSubscription) {
      this.announcedBetsSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.scrollContainer = this.scrollLottery.nativeElement;
  }

  public checkBet() {
    if (this.lotteryBallsBet.length < 9) {
      if (this.betForm.get('bet').value && Number(this.betForm.get('bet').value) >= 5) {
        if (this.ballSelectToBet) {
          const newBet = new Bet(this.ballSelectToBet, this.betForm.get('bet').value);
          this.communicatorService.announceBet(newBet);
          this.betForm.get('bet').reset();
          this.ballSelectToBet = undefined;
          this.stack++;
        } else {
          this.noBall = true;
          setTimeout(() => {
            this.noBall = false;
          }, 3000);
        }
      } else {
        this.minAmmount = true;
        setTimeout(() => {
          this.minAmmount = false;
        }, 3000);
      }
    }
  }

  public clearAllBets() {
    this.communicatorService.announceBets(undefined);
    this.communicatorService.announceTotalBet(0);
    this.stack = 0;
    this.betMade = false;
    if (this.ballSelectToBet) {
      this.lotteryBallsBet.push(this.ballSelectToBet);
    }
  }

  placeBet() {
    console.log(this.betMade);
    if (this.totalAmmountDisplay && this.totalAmmountDisplay > 0 && !this.betMade) {
      this.betMade = true;
      this.communicatorService.announcePlaceBets(true);
    } else {
      this.noBets = true;
      setTimeout(() => {
        this.noBets = false;
      }, 3000);
    }
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: this.scrollContainer.scrollWidth,
      behavior: 'smooth',
    });
  }

}
