import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { LocationService } from '../location.service'
import { FormGroup, FormControl } from '@angular/forms';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  public position: any;
  public lon: number;
  public lat: number;
  public search: string = "Current Location";
  public visible: number;

  constructor(private weatherService: WeatherService,
              private locationService: LocationService,
              private display: DisplayService) {}

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
      },
      (error: any) => console.log('error')
    );
    this.display.currentDisplay.subscribe(display => this.visible = display)
  }
  getCity(city) {
    this.weatherService.getCityWeather(this.searchForm.value.city).subscribe(
      (weather: {}) => {
        this.weatherService.weatherUpdated.emit(weather),
        this.display.changeDisplay(1)
      },
      (error) => console.error
    );
    this.weatherService.getCityCurrent(this.searchForm.value.city).subscribe(
      (city: {}) => this.weatherService.cityUpdated.emit(city),
      (error) => console.error
    );
    this.search = String(this.searchForm.value.city)
    this.display.changeDisplay(0)
  }
  getLonLat(lon, lat) {
    this.weatherService.getWeatherLonLat(this.searchForm.value.lon, this.searchForm.value.lat).subscribe(
      (weather: {}) => {
        this.weatherService.weatherUpdated.emit(weather),
        this.display.changeDisplay(2)
      },
      (error) => console.error
    );
    this.lon = this.searchForm.value.lon;
    this.lat = this.searchForm.value.lat;
    this.search = String(this.searchForm.value.lon+", "+this.searchForm.value.lat)
    this.display.changeDisplay(0)
  }

}
