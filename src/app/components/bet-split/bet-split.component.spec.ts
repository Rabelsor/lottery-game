import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetSplitComponent } from './bet-split.component';

describe('BetSplitComponent', () => {
  let component: BetSplitComponent;
  let fixture: ComponentFixture<BetSplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetSplitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
