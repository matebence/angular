import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent implements OnInit, OnDestroy {

  paramsSubscription: Subscription | undefined;
  errorMessage: string|undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message']
      }
    )
  }

  ngOnDestroy(): void {
    this.paramsSubscription!.unsubscribe();
  }
}
