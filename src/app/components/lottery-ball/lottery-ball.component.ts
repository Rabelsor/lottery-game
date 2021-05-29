import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lottery-ball',
  templateUrl: './lottery-ball.component.html',
  styleUrls: ['./lottery-ball.component.scss']
})
export class LotteryBallComponent implements OnInit {

  @Input() ballNumber: number;

  colorClass: string;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.colorClass = `ball-${this.ballNumber}`;
  }

  ngDoCheck() {
  }

}
