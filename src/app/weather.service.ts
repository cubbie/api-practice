import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class WeatherService {
  constructor(private http: Http) {}

  private apikey = "5e95e2c32b9ad691b2e7c02c21e76e84"
  public weather: {};
  weatherUpdated = new EventEmitter<{}>()

  getCityWeather(city) {
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&mode=JSON&APPID='+this.apikey)
    .map(
      (response: Response) => {
        this.weather = response.json();
        return this.weather;
      }
    );
  }
  // getCityForcast(city){
  //   this.http.get('https://api.openweathermap.org/data/2.5/forecast/daily?q='+city+'&mode=json&units=metric&cnt=5&APPID='+this.apikey)
  // }
  getWeatherLonLat(lat, lon) {
    return this.http.get('http://api.openweathermap.org/data/2.5/find?lat=' + lat +'&lon='+ lon +'&cnt=50'+'&APPID='+this.apikey)
    .map(
      (response: Response) => {
        this.weather = response.json();
        return this.weather;
      }
    );
  }
}
