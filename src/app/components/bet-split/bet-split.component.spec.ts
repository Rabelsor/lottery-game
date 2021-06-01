import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpLoaderFactory } from 'src/app/app.module';
import { LotteryBallComponent } from '../lottery-ball/lottery-ball.component';
import { LotteryBallsSelectionComponent } from '../lottery-balls-selection/lottery-balls-selection.component';

import { BetSplitComponent } from './bet-split.component';

describe('BetSplitComponent', () => {
  let component: BetSplitComponent;
  let fixture: ComponentFixture<BetSplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BetSplitComponent,
        LotteryBallsSelectionComponent,
        LotteryBallComponent
      ],
      imports: [
        BrowserAnimationsModule,
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
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

  it('bet min ammount', () => {

    // fixture.nativeElement.querySelector('input').value = 10;

    component.betForm.get('bet').setValue(4);

    fixture.nativeElement.querySelector('.input-group button').click();

    expect(component.minAmmount).toEqual(true);

  });
});
