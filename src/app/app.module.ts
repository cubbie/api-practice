import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WeatherService } from './weather.service';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { ForecastComponent } from './forecast/forecast.component';
import { MapComponent } from './map/map.component';
import { CurrentComponent } from './current/current.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    ForecastComponent,
    MapComponent,
    CurrentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
