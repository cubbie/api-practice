import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WeatherService } from './weather.service';
import { LocationService } from './location.service'
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { ForecastComponent } from './forecast/forecast.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    ForecastComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [WeatherService,
  LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
