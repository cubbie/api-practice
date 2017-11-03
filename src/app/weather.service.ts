import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Weather {
  constructor(private http: Http) {}

  getWeatherCity(city) {
    return this.http.get('api.openweathermap.org/data/2.5/weather?q=' + city)
  }

  getWeatherLonLat(lat, lon) {
    return this.http.get('http://api.openweathermap.org/data/2.5/find?lat=' + lat +'&lon='+ lon +'&cnt=50')
  }
}
