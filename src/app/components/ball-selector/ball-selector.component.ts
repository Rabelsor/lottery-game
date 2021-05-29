import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LotteryBallsSelectionComponent } from '../lottery-balls-selection/lottery-balls-selection.component';

@Component({
  selector: 'ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {

  @ViewChild('lotteryBallsSelection', {static: true}) lotteryBallsSelection: LotteryBallsSelectionComponent;

  @Output() lotteryBallSelectedEvent: EventEmitter<number[]> = new EventEmitter<number[]>();


  constructor() { }

  ngOnInit(): void {
  }

  clearSelection() {
    this.lotteryBallsSelection.clearSelection();
  }

  lotteryBallSelected(event) {
    this.lotteryBallSelectedEvent.emit(event);
  }

}
