import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
public active: boolean = false;
public weather: {list: any};

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.weatherUpdated.subscribe(
      (weather: {list: any}) => {
        this.weather = weather;
        this.active = true;
      },
      (error) => console.error
    );
  }

}
