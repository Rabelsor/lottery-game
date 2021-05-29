import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryBallComponent } from './lottery-ball.component';

describe('LotteryBallComponent', () => {
  let component: LotteryBallComponent;
  let fixture: ComponentFixture<LotteryBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotteryBallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
