import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WeatherService } from './services/weather.service';
import { LocationService } from './services/location.service'
import { DisplayService } from './services/display.service';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { ForecastComponent } from './forecast/forecast.component';

import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    ForecastComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBgWlnbkMDFn1mpOF8lJTnYC5IRUEaaW88'
    })
  ],
  providers: [WeatherService,
  LocationService,
  DisplayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
