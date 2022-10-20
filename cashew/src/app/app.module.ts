import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpCacheInterceptorModule} from '@ngneat/cashew';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot(
      {
        strategy: "explicit",
        ttl: 60000, // cache expires after 6000ms -> 60s
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
