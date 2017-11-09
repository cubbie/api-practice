import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
public hidden: boolean = false;
public weather: {list: any};

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.weatherUpdated.subscribe(
      (weather: {list: any}) => {
        this.weather = weather;
        console.log(this.weather)
      },
      (error) => console.error
    );
  }
  convertDate(time){
    return new Date(time*1000).toString().slice(0, 15);
  }
  convertTime(time){
    return new Date(time*1000).toString().slice(16, 21);
  }
  round(number) {
    return Math.round( (number/10) * 10 ) / 10;
  }
}
