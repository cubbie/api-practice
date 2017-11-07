import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import { LocationService } from './location.service'
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService,
  LocationService]
})
export class AppComponent {
  constructor(private weatherService: WeatherService) {}
  title = 'app';
}
