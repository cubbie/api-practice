import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class WeatherService {
  constructor(private http: Http) {}
  private apikey = "5e95e2c32b9ad691b2e7c02c21e76e84"
  getWeatherCity(city) {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID='+this.apikey)
  }

  getWeatherLonLat(lat, lon) {
    return this.http.get('http://api.openweathermap.org/data/2.5/find?lat=' + lat +'&lon='+ lon +'&cnt=50'+'&APPID='+this.apikey)
  }
}
