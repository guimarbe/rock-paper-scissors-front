import { Component, OnDestroy } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Decision } from 'src/app/core/constants/decision.enum';
import { Result } from 'src/app/core/constants/result.enum';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  subscriptions: Subscription = new Subscription();
  decision = Decision;
  results = Result;

  isDisabled = false;
  isLoading = false;
  playerResult: string = '';
  cpuResult: string = '';
  playerImageDecision: string = '';
  cpuImageDecision: string = '';

  constructor(private appService: AppService) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  startNewGame(): void {
    this.isDisabled = false;
    this.playerResult = '';
    this.cpuResult = '';
    this.playerImageDecision = '';
    this.cpuImageDecision = '';
  }

  getResult(decision: Decision): void {
    this.isLoading = true;
    this.appService.getResult(decision)
    .pipe(delay(750))
    .subscribe((response) => {
      this.isDisabled = true;
      this.isLoading = false;
      this.playerResult = response.result;
      this.cpuResult = this.getCpuResult(response.result);
      this.playerImageDecision = this.setImageDecision(response.playerDecision);
      this.cpuImageDecision = this.setImageDecision(response.cpuDecision);
    });
  }

  private getCpuResult(playerResult: string): string {
    let cpuResult = '';

    switch(playerResult) {
      case this.results.WIN: {
        cpuResult = this.results.LOSE;
        break;
      }
      case this.results.LOSE: {
        cpuResult = this.results.WIN;
        break;
      }
      case this.results.DRAW: {
        cpuResult = playerResult;
        break;
      }
    }

    return cpuResult;
  }

  private setImageDecision(decision: string): string {
    let imageDecision = '';

    switch(decision) {
      case this.decision.ROCK: {
        imageDecision = '✊';
        break;
      }
      case this.decision.PAPER: {
        imageDecision = '🖐';
        break;
      }
      case this.decision.SCISSORS: {
        imageDecision = '✌️';
        break;
      }
    }

    return imageDecision;
  }

}
