import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Observer, Subscription } from 'rxjs'
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  myNumbersSubscription: Subscription;
  myObservableSubscription: Subscription;
  myObservableTwoSubscription: Subscription;

  constructor() { }

  ngOnDestroy(): void {
    this.myNumbersSubscription.unsubscribe();
    this.myObservableSubscription.unsubscribe();
    this.myObservableTwoSubscription.unsubscribe();
  }

  ngOnInit() {
    const myNumbers = interval(1000).pipe(
      map((data: number) => {
        return data * 2;
      })
    );
     
    this.myNumbersSubscription = myNumbers.subscribe(
      (result: number) => {
        console.log(result);
      }
    );

    const myObservable = new Observable((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package')
      }, 2000);
      setTimeout(() => {
        observer.next('second package')
      }, 4000);
      setTimeout(() => {
        observer.error('This Wont work')
      }, 6000);
    });

    this.myObservableSubscription = myObservable.subscribe({
      next: (v: string) => console.log(v),
      error: (e: string) => console.error(e)
    });

    const myObservableTwo = new Observable((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package')
      }, 2000);
      setTimeout(() => {
        observer.next('second package')
      }, 4000);
      setTimeout(() => {
        observer.complete();
      }, 4000);
      setTimeout(() => {
        observer.next('This Wont work')
      }, 6000);
    });

    this.myObservableTwoSubscription = myObservableTwo.subscribe({
      next: (v: string) => console.log(v),
      error: (e: string) => console.error(e)
    });
  }
}
