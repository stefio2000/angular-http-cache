import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private static readonly SERVICE_EXAMPLE: string = 'https://jsonplaceholder.typicode.com/posts';
  private destroy: Subject<void> = new Subject<void>();

  title = 'ng-http-caching';
  data: { date: Date, data: any, cache: boolean }[] = [];

  constructor(private readonly httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // 1st call data will be cached
    this.requestApi(false);

    // 2nd call after 15s, data returned will be cached data
    setTimeout(() => this.requestApi(true), 15000);

    // 3rd call after 90s, data returned will be new data because cache should be expired
    setTimeout(() => this.requestApi(false), 90000);
  }

  private requestApi(shouldBeCache: boolean): void {
    this.httpClient.get(AppComponent.SERVICE_EXAMPLE)
      .pipe(takeUntil(this.destroy))
      .subscribe((data => this.data.push({date: new Date(), data, cache: shouldBeCache})));
  }

  ngOnDestroy(): void {
    this.destroy.complete();
  }
}
