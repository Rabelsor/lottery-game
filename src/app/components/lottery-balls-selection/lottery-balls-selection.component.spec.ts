import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LotteryBallsSelectionComponent } from './lottery-balls-selection.component';

describe('LotteryBallsSelectionComponent', () => {
  let component: LotteryBallsSelectionComponent;
  let fixture: ComponentFixture<LotteryBallsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LotteryBallsSelectionComponent
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
});
