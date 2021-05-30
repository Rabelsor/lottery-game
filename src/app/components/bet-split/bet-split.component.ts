import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Bet } from 'src/app/models/bet';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'bet-split',
  templateUrl: './bet-split.component.html',
  styleUrls: ['./bet-split.component.scss']
})
export class BetSplitComponent implements OnInit {

  public lotteryBallsBet: number[] = [];
  public ballSelectToBet: number;
  public totalAmmountDisplay: number = 0;
  public stack: number = 0;

  public betForm: FormGroup;

  constructor(
    private communicatorService: CommunicatorService,
    private formBuild: FormBuilder) { }

  ngOnInit(): void {

    this.betForm = this.formBuild.group({
      bet: new FormControl(null, Validators.required)
    })

    this.communicatorService.announcedSelectBall$.subscribe(response => {
      // TODO: comprobar lista de apuestas y sumar este:
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
          // TODO: no has seleccionado ninguna bola
          console.log('no has seleccionado ninguna bola');
        }
      } else {
        // TODO: warning no has apostado algo válido, 5€ o más
        console.log('warning no has apostado algo válido, 5€ o más');
      }
    } else {
      // TODO: warning no se adminten más apuestas
      console.log('no se admiten más apuestas');
    }
  }

  public clearAllBets() {
    this.communicatorService.announceBets(undefined);
    this.communicatorService.announceTotalBet(0);
    this.stack = 0;
    if(this.ballSelectToBet) {
      this.lotteryBallsBet.push(this.ballSelectToBet);
    }
  }

  placeBet() {
    // TODO: realizar apuesta
    this.communicatorService.announcePlaceBets(true);
  }
}
