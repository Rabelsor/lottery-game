import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bet } from '../models/bet';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  private announcedSelectBall = new Subject<number>();
  private announcedBet = new Subject<Bet>();
  private announcedTotalBet = new Subject<number>();
  private announcedBets = new Subject<Bet[]>();
  private announcedPlaceBets = new Subject<boolean>();


  announcedSelectBall$ = this.announcedSelectBall.asObservable();
  announcedBet$ = this.announcedBet.asObservable();
  announcedTotalBet$ = this.announcedTotalBet.asObservable();
  announcedBets$ = this.announcedBets.asObservable();
  announcedPlaceBets$ = this.announcedPlaceBets.asObservable();

  constructor() { }

  announceSelectBall(ballNumber: number) {
    this.announcedSelectBall.next(ballNumber);
  }

  announceBet(bet: Bet) {
    this.announcedBet.next(bet);
  }

  announceTotalBet(totalBet: number) {
    this.announcedTotalBet.next(totalBet);
  }

  announceBets(bets: Bet[]) {
    this.announcedBets.next(bets);
  }

  announcePlaceBets(placeBet: boolean) {
    this.announcedPlaceBets.next(placeBet);
  }


}
