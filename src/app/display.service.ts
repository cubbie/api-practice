import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DisplayService {

  private  displayValue = new BehaviorSubject<number>(0)
  currentDisplay = this.displayValue.asObservable()

  constructor(){}

  changeDisplay(display: number){
    this.displayValue.next(display)
  }
}
