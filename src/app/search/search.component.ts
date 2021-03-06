import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { LocationService } from '../services/location.service'
import { FormGroup, FormControl } from '@angular/forms';
import { DisplayService } from '../services/display.service';

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
      (error: any) => this.display.changeDisplay(4)
    );
    this.locationService.currentLat.subscribe(lat => this.lat = lat)
    this.locationService.currentLon.subscribe(lon => this.lon = lon)
    this.display.currentDisplay.subscribe(display => this.visible = display)
  }
  getCity(city) {
    this.weatherService.getCityWeather(this.searchForm.value.city).subscribe(
      (weather: {city: {coord: {lat: number, lon: number}}, list: any[]}) => {
        this.weatherService.weatherUpdated.emit(weather),
        this.locationService.changeLat(weather.city.coord.lat);
        this.locationService.changeLon(weather.city.coord.lon);
        this.display.changeDisplay(1)
      },
      (error) => this.display.changeDisplay(4)
    );
    this.weatherService.getCityCurrent(this.searchForm.value.city).subscribe(
      (city: {}) => this.weatherService.cityUpdated.emit(city),
      (error) => this.display.changeDisplay(4)
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
      (error) => this.display.changeDisplay(4)
    );
    this.lon = parseInt(this.searchForm.value.lon);
    this.lat = parseInt(this.searchForm.value.lat);
    this.locationService.changeLat(this.lat);
    this.locationService.changeLon(this.lon);
    this.search = String(this.searchForm.value.lat+", "+this.searchForm.value.lon);
    this.display.changeDisplay(0);
  }

}
