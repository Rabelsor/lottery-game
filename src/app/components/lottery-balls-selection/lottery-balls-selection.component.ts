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
    ])
  ],
  styleUrls: ['./lottery-balls-selection.component.scss']
})
export class LotteryBallsSelectionComponent implements OnInit {

  @Output() lotteryBallSelectedEvent: EventEmitter<number[]> = new EventEmitter<number[]>();

  public lotteryBalls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public lotteryBallSelected: number[] = [];


  closeResult = '';

  constructor() { }

  ngOnInit(): void {
  }

  trackByBalls(index: number, ball: number): number {
    return ball;
  }

  addBall(numberBall: number): void {
    if(!this.lotteryBallSelected.includes(numberBall) && this.lotteryBallSelected.length < 8) {
      this.lotteryBallSelected.push(numberBall);
      this.lotteryBallSelectedEvent.emit(this.lotteryBallSelected);
    } else if(this.lotteryBallSelected.length === 8) {
      console.log('TODO: mensaje ya no agregas más');

    }
  }

  clearSelection() {
    this.lotteryBallSelected.splice(0, this.lotteryBallSelected.length);
    this.lotteryBallSelectedEvent.emit(this.lotteryBallSelected);

  }

}
