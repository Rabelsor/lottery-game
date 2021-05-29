import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'lottery-balls-selection',
  templateUrl: './lottery-balls-selection.component.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ])
      ])
    ]),
    trigger('queryAnimation', [
      transition('* => goAnimate', [
        // hide the inner elements
        query('div', style({ opacity: 0 })),

        // animate the inner elements in, one by one
        query('div', animate(1000, style({ opacity: 1 }))),
      ])
    ])
  ],
  styleUrls: ['./lottery-balls-selection.component.scss']
})
export class LotteryBallsSelectionComponent implements OnInit {

  @Output() lotteryBallSelectedEvent: EventEmitter<number[]> = new EventEmitter<number[]>();

  public lotteryBalls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public lotteryBallSelected: number[] = [];

  public noMoreBalls = false;

  constructor() { }

  ngOnInit(): void {
  }

  trackByBalls(index: number, ball: number): number {
    return ball;
  }

  addBall(numberBall: number): void {
    if(!this.lotteryBallSelected.includes(numberBall) && this.lotteryBallSelected.length === 0) {
      this.lotteryBallSelected.push(numberBall);
      this.lotteryBallSelectedEvent.emit(this.lotteryBallSelected);
    } else if(this.lotteryBallSelected.length === 1) {
      this.noMoreBalls = true;

      setTimeout(() => {
        this.noMoreBalls = false;
      }, 3000);
    }
  }

  clearSelection() {
    this.lotteryBallSelected.splice(0, this.lotteryBallSelected.length);
    this.lotteryBallSelectedEvent.emit(this.lotteryBallSelected);

  }

}
