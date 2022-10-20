import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NgHttpCachingModule, NgHttpCachingConfig, NgHttpCachingStrategy, NgHttpCachingLocalStorage, NgHttpCachingEntry} from 'ng-http-caching';
import {HttpClientModule} from "@angular/common/http";

// See https://github.com/nigrosimone/ng-http-caching#config
const ngHttpCachingConfig: NgHttpCachingConfig = {
  lifetime: 60000, // cache expires after 6000ms -> 60s
  allowedMethod: ['GET', 'HEAD'],
  cacheStrategy: NgHttpCachingStrategy.ALLOW_ALL,
  isValid: (entry: NgHttpCachingEntry): boolean | undefined => {
    // In this example only response with status code 200 can be stored into the cache
    return entry.response.status === 200;
  },
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgHttpCachingModule.forRoot(ngHttpCachingConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
