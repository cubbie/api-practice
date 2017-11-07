import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { LocationService } from '../location.service'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  position: any;
  lon: any;
  lat: any;

  constructor(private weatherService: WeatherService,
              private locationService: LocationService) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      'city': new FormControl(null),
      'lon': new FormControl(null),
      'lat': new FormControl(null)
    });
    this.locationService.getLocation().subscribe(
      (position: {}) => {
        this.position = position;
        this.lon = this.position.coords.longitude;
        this.lat = this.position.coords.latitude;
        console.log(this.lon +', '+this.lat);
      },
      (error: any) => console.log('error')
    );

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
