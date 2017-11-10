import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
public hidden: boolean = true;
public weather: {list: any};
public city: {};

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.weatherUpdated.subscribe(
      (weather: {list: any}) => {
        this.weather = weather;
      },
      (error) => console.error
    );
    this.weatherService.cityUpdated.subscribe(
      (city: {}) => {
        this.city = city;
        console.log(this.city)
      },
      (error) => console.error
    );
  }
  convertDate(time){
    return new Date(time*1000).toString().slice(0, 15);
  }
  convertTime(time){
    const h = parseInt(new Date(time*1000).toString().slice(16, 18));
    const m = parseInt(new Date(time*1000).toString().slice(19, 21))
    if (h > 12) {
      return (h - 12) + new Date(time*1000).toString().slice(18, 21)+ " PM"
    } else if (h < 10) {
      return new Date(time*1000).toString().slice(17, 21)+" AM"
    } else if (h === 12 && m > 0) {
      return new Date(time*1000).toString().slice(16, 21)+" PM"
    } else {
      return new Date(time*1000).toString().slice(16, 21)+" AM"
    }
  }
  round(number) {
    return Math.round( (number/10) * 10 ) / 10;
  }
  windDirection(degree: number){
    if (348.75 <= degree && degree > 11.25) {
      return "N"
    } else if (11.25 >= degree && degree > 33.75) {
      return "NNE"
    } else if (33.75 >= degree && degree > 56.25) {
      return "NE"
    } else if (56.25 >= degree && degree > 78.75) {
      return "ENE"
    } else if (78.75 >= degree && degree > 101.25) {
      return "E"
    } else if (101.25 >= degree && degree > 123.75) {
      return "ESE"
    } else if (123.75 >= degree && degree > 146.25) {
      return "SE"
    } else if (146.25 >= degree && degree > 168.75) {
      return "SSE"
    } else if (168.75 >= degree && degree > 191.25) {
      return "S"
    } else if (191.25 >= degree && degree > 213.75) {
      return "SSW"
    } else if (213.75 >= degree && degree > 236.25) {
      return "SW"
    } else if (236.25 >= degree && degree > 258.75) {
      return "WSW"
    } else if (258.75 >= degree && degree > 281.25) {
      return "W"
    } else if (281.25 >= degree && degree > 303.75) {
      return "WNW"
    } else if (303.75 >= degree && degree > 326.25) {
      return "NW"
    } else if (326.25 >= degree && degree > 348.75) {
      return "NNW"
    }
  }
}
