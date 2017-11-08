import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {

public weather: {list: {}};

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.weatherUpdated.subscribe(
      (weather: {list: {}}) => {
        this.weather = weather
      },
      (error) => console.error
    );
  }

}
