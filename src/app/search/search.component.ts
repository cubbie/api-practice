import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  setPosition: any;
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      'city': new FormControl(null),
      'lon': new FormControl(null),
      'lat': new FormControl(null)
    });
    if(window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this)),
      console.log(this.setPosition)
    };
  }
  getCity(city) {
    this.weatherService.getCityWeather(this.searchForm.value.city).subscribe(
      (weather: {}) => this.weatherService.weatherUpdated.emit(weather),
      (error) => console.error
    );
    // this.weatherService.getCityForcast(this.searchForm.value.city).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.error
    // );
  }
  getLonLat(lon, lat) {
    this.weatherService.getWeatherLonLat(this.searchForm.value.lon, this.searchForm.value.lat).subscribe(
      (response) => console.log(response),
      (error) => console.error
    );
  }

}
