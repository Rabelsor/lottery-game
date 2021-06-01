import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LotteryBallComponent } from '../lottery-ball/lottery-ball.component';

import { LotteryBallsSelectionComponent } from './lottery-balls-selection.component';

describe('LotteryBallsSelectionComponent', () => {
  let component: LotteryBallsSelectionComponent;
  let fixture: ComponentFixture<LotteryBallsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LotteryBallsSelectionComponent,
        LotteryBallComponent
      ],
      imports: [
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryBallsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('lottery balls', () => {
    expect(component.lotteryBalls.length).toEqual(10);
  });

  it('lottery balls click first', () => {

    fixture.nativeElement.querySelector('li lottery-ball').click();

    expect(component.lotteryBallSelected).toEqual(1);

  });

});
